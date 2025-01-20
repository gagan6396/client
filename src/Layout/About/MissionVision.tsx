import handshakeImage from "@/public/About/handshake.png";
import kidsGroup from "@/public/l10.jpg";
import womenFarmers from "@/public/l9.jpg";
import Image from "next/image";

export function MissionVision() {
  return (
    <div className="">
      <div className="p-8 bg-green-50">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-green-900">
            Our Mission & Vision
          </h1>
        </div>

        {/* Mission and Vision Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Mission */}
          <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold text-green-900 text-center mb-4">
              Our Mission
            </h2>
            <p className="text-center text-gray-600 mb-6">
              To connect small farmers from Uttarakhand’s hills under one
              nurturing platform, preserving traditional farming, empowering
              women, and promoting healthy, pure, and natural produce for a
              better tomorrow.
            </p>
            <div className="space-y-4">
              <div className="flex items-center bg-green-100 p-4 rounded-lg shadow-md">
                <div className="flex-shrink-0 text-white p-2 rounded-full">
                  {/* <img src="/handshake-icon.png" alt="Icon" className="w-6 h-6" /> */}
                  <Image
                    src={handshakeImage}
                    alt="Handshake Icon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-green-900">
                    Connecting Communities:
                  </h3>
                  <p className="text-sm text-gray-600">
                    Support local farmers and prevent migration.
                  </p>
                </div>
              </div>

              <div className="flex items-center bg-green-100 p-4 rounded-lg shadow-md">
                <div className="flex-shrink-0 text-white p-2 rounded-full">
                  <Image
                    src={handshakeImage}
                    alt="Handshake Icon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-green-900">
                    Empowerment Focus:
                  </h3>
                  <p className="text-sm text-gray-600">
                    Enable women to lead and thrive.
                  </p>
                </div>
              </div>

              <div className="flex items-center bg-green-100 p-4 rounded-lg shadow-md">
                <div className="flex-shrink-0 text-white p-2 rounded-full">
                  <Image
                    src={handshakeImage}
                    alt="Handshake Icon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-green-900">
                    Sustainability Commitment:
                  </h3>
                  <p className="text-sm text-gray-600">
                    Advocate for eco-friendly and healthy farming practices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold text-green-900 text-center mb-4">
              Our Vision
            </h2>
            <p className="text-center text-gray-600 mb-6">
              To transform lives by nurturing hill communities, empowering
              women, and celebrating Uttarakhand&apos;s rich agricultural
              heritage, fostering a future where nature and people thrive
              together.
            </p>
            <div className="space-y-4">
              <div className="flex items-center bg-green-100 p-4 rounded-lg shadow-md">
                <div className="flex-shrink-0 text-white p-2 rounded-full">
                  <Image
                    src={handshakeImage}
                    alt="Handshake Icon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-green-900">
                    Holistic Growth:
                  </h3>
                  <p className="text-sm text-gray-600">
                    Foster socio-economic growth in hill regions.
                  </p>
                </div>
              </div>

              <div className="flex items-center bg-green-100 p-4 rounded-lg shadow-md">
                <div className="flex-shrink-0 text-white p-2 rounded-full">
                  <Image
                    src={handshakeImage}
                    alt="Handshake Icon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-green-900">
                    Healthy Living:
                  </h3>
                  <p className="text-sm text-gray-600">
                    Promote a culture of health and well-being through natural
                    products.
                  </p>
                </div>
              </div>

              <div className="flex items-center bg-green-100 p-4 rounded-lg shadow-md">
                <div className="flex-shrink-0 text-white p-2 rounded-full">
                  <Image
                    src={handshakeImage}
                    alt="Handshake Icon"
                    className="w-6 h-6"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-green-900">
                    Community Strength:
                  </h3>
                  <p className="text-sm text-gray-600">
                    Build empowered and self-reliant communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 px-4 bg-white">
        <div className="container mx-auto space-y-8">
          {/* Section 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <Image
                src={kidsGroup}
                alt="Group of kids"
                className="rounded-lg"
              />
            </div>
            {/* Content */}
            <div className="w-full lg:w-1/2 text-gray-700">
              <p className="text-lg leading-relaxed">
                Gauraj is dedicated to bringing the pure, natural bounty of
                Uttarakhand’s hills to consumers while supporting the resilient
                farmers who cultivate it. Nestled in the heart of the enchanting
                mountains, we aim to create sustainable livelihoods that keep
                families together and preserve the vibrant hill culture.
                Migration to far-off cities has long disrupted these
                communities, but Gauraj stands as a pledge to reverse this trend
                by connecting small farmers to markets and fostering economic
                stability. Led by a passionate team of women, we champion
                empowerment, sustainability, and the celebration of the
                Himalayan way of life, making Gauraj more than a venture—it’s a
                movement for meaningful change.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-6">
            {/* Content */}
            <div className="w-full lg:w-1/2 text-gray-700">
              <p className="text-lg leading-relaxed">
                At Gauraj, we strive to empower women by integrating them into
                every aspect of our operations, helping elevate their social and
                economic status. From cultivating organic produce to preserving
                it and promoting healthy living, we believe that empowered women
                are the backbone of empowered communities. Our mission
                transcends food production—we foster a lifestyle rooted in
                health, well-being, and harmony with nature. Every product we
                deliver reflects our respect for the environment and commitment
                to quality. By choosing Gauraj, you are not only opting for
                fresh, natural produce but also contributing to a movement that
                uplifts hill communities, nurtures dreams, and celebrates the
                rich culture and resilience of Uttarakhand.
              </p>
            </div>
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <Image
                src={womenFarmers}
                alt="Group of women farmers"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
