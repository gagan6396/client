"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactFormSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-16 bg-white">
      {/* Left Section */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-[#a5a54a] mb-4">GET IN TOUCH WITH US</h2>
        <p className="text-gray-600 mb-8">
          “We’d love to hear from you! Reach out for inquiries, feedback, or support.”
        </p>

        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start gap-4 p-4 border border-[#d9d9a0] rounded-lg">
            <MapPin className="text-[#a5a54a] w-6 h-6" />
            <p className="text-sm text-gray-700">
              Gauraj Valleyfood Pvt. Ltd. <br />
              New Mothorowala Road, Uttarakhand 248001
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 p-4 border border-[#d9d9a0] rounded-lg">
            <Mail className="text-[#a5a54a] w-6 h-6" />
            <p className="text-sm text-gray-700">support@gauraj.org</p>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 p-4 border border-[#d9d9a0] rounded-lg">
            <Phone className="text-[#a5a54a] w-6 h-6" />
            <p className="text-sm text-gray-700">+91-6397-90-4655</p>
          </div>

          {/* Working Hours */}
          <div className="p-4 border border-[#d9d9a0] rounded-lg">
            <p className="text-sm text-gray-700">
              Monday – Saturday: 9:00–20:00 <br />
              Sunday: 10:00–19:00
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white p-6 border border-gray-200 rounded-lg shadow-md">
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <Input placeholder="Name" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input type="email" placeholder="Email" />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <Textarea placeholder="Message" />
          </div>

          {/* Submit Button */}
          <div>
            <Button className="w-full bg-[#4a2b2b] text-white hover:bg-[#3b2323]">
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
