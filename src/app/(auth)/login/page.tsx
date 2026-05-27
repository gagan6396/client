"use client";

import { LoginAPI } from "@/apis/AuthAPIs";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const passwordSchema = Yup.object({
  emailOrPhone: Yup.string()
    .required("Email or phone number is required")
    .test("email-or-phone", "Invalid email or phone number", (value) => {
      if (!value) return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type PasswordFormData = { emailOrPhone: string; password: string };
type LoginMode = "password" | "otp";
type OtpStep = "phone" | "otp";

const RECAPTCHA_CONTAINER_ID = "recaptcha-container-login";

// ─── FIX: Backend returns { user: { token } }, so save as accessToken ─────────
const saveTokens = (token: string) => {
  localStorage.setItem("accessToken", token);
};

const LoginPage = () => {
  const router = useRouter();

  const [loginMode, setLoginMode] = useState<LoginMode>("password");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [otpStep, setOtpStep] = useState<OtpStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
    defaultValues: { emailOrPhone: "", password: "" },
  });

  // ─── Mount recaptcha container at body level ──────────
  useEffect(() => {
    if (document.getElementById(RECAPTCHA_CONTAINER_ID)) return;
    const div = document.createElement("div");
    div.id = RECAPTCHA_CONTAINER_ID;
    div.style.cssText =
      "position:fixed;bottom:0;right:0;z-index:-1;opacity:0;pointer-events:none;width:1px;height:1px;";
    document.body.appendChild(div);

    return () => {
      clearRecaptcha();
      document.getElementById(RECAPTCHA_CONTAINER_ID)?.remove();
    };
  }, []);

  // ─── Countdown timer ──────────────────────────────────
  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  // ─── Helper: destroy verifier ─────────────────────────
  const clearRecaptcha = () => {
    try {
      recaptchaVerifierRef.current?.clear();
    } catch (_) {}
    recaptchaVerifierRef.current = null;
  };

  // ─── Helper: create fresh verifier ────────────────────
  const createRecaptcha = (): RecaptchaVerifier => {
    clearRecaptcha();
    const verifier = new RecaptchaVerifier(auth, RECAPTCHA_CONTAINER_ID, {
      size: "invisible",
      callback: () => {},
      "expired-callback": () => {
        clearRecaptcha();
      },
    });
    recaptchaVerifierRef.current = verifier;
    return verifier;
  };

  // ─── Password login ───────────────────────────────────
  const handlePasswordLogin = async (values: PasswordFormData) => {
    setLoading(true);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(values.emailOrPhone);
      const payload: any = { password: values.password };
      if (isEmail) payload.email = values.emailOrPhone;
      else payload.phone = values.emailOrPhone;

      const response = await LoginAPI(payload);

      if (response.data.success) {
        // ✅ FIX: Backend returns { data: { user: { token } } }
        // Previously was reading .accessToken and .refreshToken which don't exist
        const token = response.data.data?.user?.token ?? response.data.data?.token;

        if (!token) {
          toast.error("Login failed: no token received. Contact support.", {
            position: "top-center",
          });
          return;
        }

        saveTokens(token);
        toast.success("Login successful!", { position: "top-center" });
        router.replace("/");
      } else {
        toast.error(response.data.message || "Login failed", {
          position: "top-center",
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  // ─── OTP: send ────────────────────────────────────────
  const sendOTP = async () => {
    setOtpError("");

    if (!phone || phone.length !== 10) {
      setOtpError("Please enter a valid 10-digit mobile number");
      return;
    }

    setOtpLoading(true);
    try {
      const checkRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/auth/check-phone`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: `+91${phone}` }),
        }
      );
      const checkData = await checkRes.json();
      if (!checkRes.ok || !checkData.success) {
        setOtpError(
          checkData.message ||
            "No account found with this number. Please register first."
        );
        return;
      }

      const verifier = createRecaptcha();
      await verifier.render();

      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        verifier
      );
      confirmationRef.current = confirmation;
      setOtpStep("otp");
      setCountdown(30);
    } catch (err: any) {
      clearRecaptcha();
      if (err?.code === "auth/invalid-phone-number") {
        setOtpError("Invalid phone number. Please check and try again.");
      } else if (err?.code === "auth/too-many-requests") {
        setOtpError("Too many attempts. Please try again later.");
      } else if (err?.code === "auth/captcha-check-failed") {
        setOtpError("reCAPTCHA check failed. Please refresh and try again.");
      } else {
        setOtpError(`Error: ${err?.code ?? err?.message ?? "Unknown error"}`);
      }
    } finally {
      setOtpLoading(false);
    }
  };

  // ─── OTP: verify ─────────────────────────────────────
  const verifyOTP = async () => {
    setOtpError("");
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP");
      return;
    }
    try {
      setOtpLoading(true);
      const result = await confirmationRef.current!.confirm(otpValue);
      const firebaseToken = await result.user.getIdToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firebaseToken, phone: `+91${phone}` }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // ✅ FIX: Backend returns { data: { user: { token } } }
        // Previously was reading .accessToken and .refreshToken which don't exist
        const token = data.data?.user?.token ?? data.data?.token;

        if (!token) {
          setOtpError("Login failed: no token received. Contact support.");
          return;
        }

        saveTokens(token);
        toast.success("Login successful!", { position: "top-center" });
        router.replace("/");
      } else {
        setOtpError(data.message || "Login failed. Please try again.");
      }
    } catch (err: any) {
      console.error("[OTP] verifyOTP FAILED →", err?.code, err?.message);
      if (err?.code === "auth/invalid-verification-code") {
        setOtpError("Incorrect OTP. Please check and try again.");
      } else if (err?.code === "auth/code-expired") {
        setOtpError("OTP expired. Please request a new one.");
      } else {
        setOtpError("Verification failed. Please try again.");
      }
    } finally {
      setOtpLoading(false);
    }
  };

  // ─── OTP input handlers ───────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setOtp(["", "", "", "", "", ""]);
    setOtpStep("phone");
    setTimeout(() => sendOTP(), 150);
  };

  // ─── Render ───────────────────────────────────────────
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#7A6E18]/20 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md sm:max-w-lg shadow-lg rounded-xl border border-gray-100 overflow-hidden mx-2 sm:mx-0">
        <CardHeader className="bg-gradient-to-r from-[#2d5437] to-[#2d5437] text-white rounded-t-xl p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-100 text-sm sm:text-base text-center">
            Sign in to explore your organic journey with Gauraaj.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          {/* ── Mode Toggle ── */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
            <button
              onClick={() => {
                setLoginMode("password");
                setOtpError("");
              }}
              className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-300 ${
                loginMode === "password"
                  ? "bg-[#2d5437] text-white"
                  : "bg-white text-gray-500 hover:text-[#2d5437]"
              }`}
            >
              Email / Password
            </button>
            <button
              onClick={() => {
                setLoginMode("otp");
                setOtpStep("phone");
                setOtpError("");
              }}
              className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-300 ${
                loginMode === "otp"
                  ? "bg-[#2d5437] text-white"
                  : "bg-white text-gray-500 hover:text-[#2d5437]"
              }`}
            >
              Mobile OTP
            </button>
          </div>

          {/* ══════════ PASSWORD LOGIN ══════════ */}
          {loginMode === "password" && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handlePasswordLogin)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="emailOrPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base text-gray-700">
                        Email or Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter your email or phone number"
                          className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-4 transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="rounded-lg border-gray-200 bg-gray-50 shadow-sm text-sm sm:text-base focus:ring-green-500 focus:border-green-500 p-3 sm:p-4 transition-all duration-300"
                          />
                          <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2d5437] hover:bg-[#2d5437] text-white text-sm sm:text-base md:text-lg font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <ClipLoader size={20} color="#ffffff" />
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Form>
          )}

          {/* ══════════ OTP LOGIN ══════════ */}
          {loginMode === "otp" && (
            <div className="space-y-6">
              {otpStep === "phone" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#2d5437] bg-gray-50">
                      <span className="px-4 py-3 bg-gray-100 text-gray-600 border-r border-gray-200 font-medium text-sm">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ""))
                        }
                        onKeyDown={(e) => e.key === "Enter" && sendOTP()}
                        placeholder="Enter 10-digit number"
                        className="flex-1 px-4 py-3 outline-none text-gray-800 text-sm bg-gray-50"
                      />
                    </div>
                    {otpError && (
                      <p className="text-red-500 text-xs mt-2">{otpError}</p>
                    )}
                  </div>

                  <Button
                    onClick={sendOTP}
                    disabled={otpLoading}
                    className="w-full bg-[#2d5437] hover:bg-[#2d5437] text-white text-sm sm:text-base font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {otpLoading ? (
                      <div className="flex items-center gap-2">
                        <ClipLoader size={20} color="#ffffff" />
                        Sending OTP...
                      </div>
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-center text-sm text-gray-500 mb-4">
                      OTP sent to{" "}
                      <span className="font-semibold text-[#2d5437]">
                        +91 {phone}
                      </span>
                    </p>
                    <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                      Enter 6-digit OTP
                    </label>
                    <div className="flex justify-center gap-2 sm:gap-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          type="tel"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-10 h-12 sm:w-12 sm:h-13 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#2d5437] focus:ring-2 focus:ring-[#2d5437]/20 transition-all bg-gray-50"
                        />
                      ))}
                    </div>
                    {otpError && (
                      <p className="text-red-500 text-xs mt-3 text-center">
                        {otpError}
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={verifyOTP}
                    disabled={otpLoading}
                    className="w-full bg-[#2d5437] hover:bg-[#2d5437] text-white text-sm sm:text-base font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {otpLoading ? (
                      <div className="flex items-center gap-2">
                        <ClipLoader size={20} color="#ffffff" />
                        Verifying...
                      </div>
                    ) : (
                      "Verify OTP"
                    )}
                  </Button>

                  <div className="text-center space-y-2">
                    {countdown > 0 ? (
                      <p className="text-gray-500 text-sm">
                        Resend OTP in{" "}
                        <span className="text-[#2d5437] font-semibold">
                          {countdown}s
                        </span>
                      </p>
                    ) : (
                      <button
                        onClick={handleResend}
                        className="text-[#2d5437] text-sm font-semibold hover:underline"
                      >
                        Resend OTP
                      </button>
                    )}
                    <div>
                      <button
                        onClick={() => {
                          setOtpStep("phone");
                          setOtpError("");
                          setOtp(["", "", "", "", "", ""]);
                        }}
                        className="text-gray-400 text-xs hover:text-gray-600"
                      >
                        ← Change number
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── Footer links ── */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <Link
              href="/forgot-password"
              className="text-[#7A6E18] font-medium hover:underline transition-colors duration-200"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="mt-3 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#7A6E18] font-semibold hover:underline transition-colors duration-200"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;