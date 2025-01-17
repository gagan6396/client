import { FC } from "react";

interface StoreInfo {
  title: string;
  address: string;
  timings: string;
  delivery: string;
}

const stores: StoreInfo[] = [
  {
    title: "Rajpur Road",
    address: "THE PMFME STORE, Opp Gandhi Park, Rajpur Road, Dehradun",
    timings: "6:00–21:30",
    delivery: "10:00 – 17:00",
  },
  {
    title: "Race Course",
    address: "Grocery for U, Suri Chowk, Race Course, Dehradun",
    timings: "7:00–22:00",
    delivery: "10:00 – 17:00",
  },
  {
    title: "Banjarawala",
    address: "Vega Superstore Near Siddheshwar Temple, Bajaraawala, Dehradun",
    timings: "7:00–23:00",
    delivery: "10:00 – 17:00",
  },
  {
    title: "Kedarpuram",
    address: "Gauraraj Pahadi Fasal Ewam Hastshilp, New Mothorowal Road, Dehradun",
    timings: "9:30–19:30",
    delivery: "10:00 – 17:00",
  },
];

const StoreCards: FC = () => {
  return (
    <div className="mt-12 text-center">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Looking for Our Local Store?
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stores.map((store, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-4 text-left border"
          >
            <h3 className="font-semibold text-lg text-green-700 mb-2">
              {store.title}
            </h3>
            <p className="text-gray-600">{store.address}</p>
            <p className="text-gray-600 mt-2">
              <strong>Monday – Sunday:</strong> {store.timings}
            </p>
            <p className="text-gray-600 mt-1">
              <strong>Delivery:</strong> {store.delivery}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreCards;
