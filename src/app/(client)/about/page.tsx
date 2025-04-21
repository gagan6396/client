import AboutHeroSection from "@/Layout/About/AboutHeroSection";
import AwardsAchievements from "@/Layout/About/AwardsAchievements";
import ImpactSection from "@/Layout/About/ImpactSection";
import { MissionVision } from "@/Layout/About/MissionVision";
import { OrganicCollection } from "@/Layout/About/OrganicCollection";
import SubscriptionForm from "@/Layout/SubscriptionForm";
import Testimonials from "@/Layout/Testimonials";

const page = () => {
  return (
    <div>
      <AboutHeroSection />
      <MissionVision />
      {/* <TeamAndTargets /> */}
      <ImpactSection />
      <AwardsAchievements />
      <Testimonials />
      <OrganicCollection />
      <SubscriptionForm />
    </div>
  );
};

export default page;
