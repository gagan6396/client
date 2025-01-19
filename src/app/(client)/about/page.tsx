

import AboutHeroSection from "@/Layout/About/AboutHeroSection";
import { MissionVision } from "@/Layout/About/MissionVision";
import { OrganicCollection } from "@/Layout/About/OrganicCollection";
import { TeamAndTargets } from "@/Layout/About/TeamAndTargets";
import SubscriptionForm from "@/Layout/SubscriptionForm";
import Testimonials from "@/Layout/Testimonials";

const page = () => {
  return (
    <div>
      <AboutHeroSection />
      <MissionVision />
      <TeamAndTargets />
      {/* <AwardsAchievements /> */}
      <Testimonials />
      <OrganicCollection />
      <SubscriptionForm />
    </div>
  )
}

export default page


