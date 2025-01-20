// import imp1 from "@/public/11.png";
import { ContactCard } from "@/Layout/ContactCard";
import ContactFormSection from "@/Layout/ContactFormSection";
import { LocationCard } from "@/Layout/LocationCard";
import StoreCards from "@/Layout/StoreCards";
import SubscriptionForm from "@/Layout/SubscriptionForm";


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
