import React from "react";
import Image from "next/image";
import teamMember1 from "@/public/About/suman-nainwal.png";
import target1 from "@/public/About/target1.png";
import target2 from "@/public/About/target2.png";
import target3 from "@/public/About/target3.png";

export function TeamAndTargets() {
  return (
    <div className="bg-white py-12 px-6">
      <div className="container mx-auto space-y-12">
        {/* Our Team Section */}
        <section className="text-center space-y-8">
          <h2 className="text-2xl font-bold text-green-800">Our Team</h2>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* Team Member Card */}
            <div className="w-1/4">
              <div className="rounded-lg shadow-lg bg-gray-50 p-2">
                <Image
                  src={teamMember1}
                  alt="Mrs. Suman Nainwal"
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-2">
                  <h3 className="text-sm font-semibold">Mrs. Suman Nainwal</h3>
                  <p className="text-gray-600 text-xs">Founder</p>
                </div>
              </div>
            </div>
            {/* Empty Placeholder */}
            <div className="w-1/4 bg-gray-200 rounded-lg h-40"></div>
          </div>
        </section>

        {/* Our Targets Section */}
        <section className="text-center space-y-8">
          <h2 className="text-2xl font-bold text-green-800">Our Targets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Target Card 1 */}
            <div className="rounded-lg shadow-lg bg-gray-50 p-4">
              <Image
                src={target1}
                alt="A Halt to Migration"
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-base font-semibold text-green-800">
                  A Halt to Migration
                </h3>
                <p className="text-gray-600 text-sm">
                  We aim to curb the migration from Uttarakhand’s hills by
                  creating sustainable livelihoods. By connecting small farmers
                  to larger markets, we help them thrive in their homeland,
                  preserving the cultural and social fabric of these vibrant
                  communities.
                </p>
              </div>
            </div>

            {/* Target Card 2 */}
            <div className="rounded-lg shadow-lg bg-gray-50 p-4">
              <Image
                src={target2}
                alt="Women's Empowerment"
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-base font-semibold text-green-800">
                  Women's Empowerment
                </h3>
                <p className="text-gray-600 text-sm">
                  Empowering women is at the heart of Gauraj’s mission. We
                  provide opportunities for women to actively participate in
                  every stage of our operations, enhancing their social and
                  economic status and building stronger, self-reliant
                  communities.
                </p>
              </div>
            </div>

            {/* Target Card 3 */}
            <div className="rounded-lg shadow-lg bg-gray-50 p-4">
              <Image
                src={target3}
                alt="Healthy Eating, Healthy Living"
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-base font-semibold text-green-800">
                  Healthy Eating, Healthy Living
                </h3>
                <p className="text-gray-600 text-sm">
                  Our commitment to health is unwavering. We promote natural,
                  organic farming practices that deliver fresh, wholesome
                  produce. By choosing Gauraj, you’re not only nourishing your
                  body but supporting a lifestyle that respects nature and
                  values well-being.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
