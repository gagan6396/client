import { NextPage } from "next";


import { MissionVision } from "@/Layout/About/MissionVision";
import Testimonials from "@/Layout/Testimonials";
import SubscriptionForm from "@/Layout/SubscriptionForm";
import { OrganicCollection } from "@/Layout/About/OrganicCollection";
import { TeamAndTargets } from "@/Layout/About/TeamAndTargets";
import AwardsAchievements from "@/Layout/About/AwardsAchievements";
import AboutHeroSection from "@/Layout/About/AboutHeroSection";

const page = () => {
  return (
    <div>
      <AboutHeroSection />
      <MissionVision />
      <TeamAndTargets />
      <AwardsAchievements />
      <Testimonials />
      <OrganicCollection />
      <SubscriptionForm />
    </div>
  )
}

export default page


