// import imp1 from "@/public/11.png";
import ContactFormSection from "@/Layout/ContactFormSection";
import {LocationCard } from "@/Layout/LocationCard";
import {ContactCard } from "@/Layout/ContactCard";
import SubscriptionForm from "@/Layout/SubscriptionForm";
import StoreCards from "@/Layout/StoreCards";


const page = () => {
  return (
    <div>
      {/* <img src={imp1.src} alt="Google Logo" /> */}
      <ContactFormSection/>
      <LocationCard />
      <StoreCards />

      <ContactCard />
      <SubscriptionForm />

    </div>
  );
};

export default page;
