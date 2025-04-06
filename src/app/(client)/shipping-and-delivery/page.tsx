import Head from "next/head";

export default function ShippingAndDelivery() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-sans">
      <Head>
        <title>Shipping and Delivery - Gauraaj</title>
        <meta
          name="description"
          content="Shipping and delivery policy for www.gauraaj.org"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 w-full max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Shipping and Delivery
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Home / Shipping and Delivery
        </p>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-400 pb-2 mb-4">
            SHIPPING & DELIVERY POLICY
          </h2>
          <p className="text-gray-600 mb-6">(within India only)</p>

          <p className="text-gray-600 mb-6">
            www.gauraaj.org is committed to deliver your order with good quality
            packaging within given time frame. We ship throughout the week,
            except Sunday & Public holidays. To ensure that your order reaches
            you in good condition, in the shortest span of time, we ship through
            reputed courier agencies.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">
            HOW LONG DOES IT TAKE FOR AN ORDER TO ARRIVE?
          </h3>
          <p className="text-gray-600 mb-6">
            Orders are dispatched the next working day. Most orders are
            delivered within 3 to 4 working days. However, in case there are few
            areas which are out of coverage deliverable areas, the delivery time
            may be longer. Delivery of all orders will be duly done to the
            address as mentioned by you at the time of placing the order.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">
            WHAT IF THE PRODUCT IS RECEIVED IN DAMAGED CONDITION?
          </h3>
          <p className="text-gray-600 mb-6">
            If you think, you have received the product in a bad condition or if
            the packaging is tampered with or damaged before delivery, please
            refuse to accept the package and return the package to the delivery
            person. Also, please email us at support@gauraaj.org mentioning your
            Order ID. We will personally ensure that a brand new replacement is
            issued to you with no additional cost. Please make sure that the
            original product tag and packing is intact when you send us the
            product back.
          </p>
        </section>
      </main>
    </div>
  );
}
