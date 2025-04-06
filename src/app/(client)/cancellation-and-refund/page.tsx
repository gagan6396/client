import Head from "next/head";

export default function CancellationAndRefund() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-sans">
      <Head>
        <title>Cancellation and Refund - Gauraaj</title>
        <meta
          name="description"
          content="Cancellation, return, replacement, and refund policy for www.gauraaj.org"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 w-full max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Cancellation and Refund
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Home / Cancellation and Refund
        </p>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-400 pb-2 mb-4">
            CANCELLATION, RETURN, REPLACEMENT & REFUND POLICY
          </h2>
          <p className="text-gray-600 mb-6">
            Gauraaj believes in & we can to help its customers as far as
            possible, and has therefore a liberal policy for Cancellation,
            Return, Replacement and Refund.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">
            CANCELLATION:
          </h3>
          <p className="text-gray-600 mb-6">
            How do I cancel an order – If unfortunately you have to cancel an
            order, please do so within 24 hours of placing the order. For
            outright cancellations by you: If you cancel your order before your
            product has shipped, we will refund the entire amount.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">
            RETURN & REPLACEMENT:
          </h3>
          <p className="text-gray-600 mb-6">
            If you received the product, it will be eligible for replacement,
            only in cases where there are defects found with the product. For
            other Products – In case of complaints regarding products that come
            with a warranty from manufacturers, please refer the issue to the
            concerned manufacturer. Let us know & we’ll help you regarding the
            same. If you think, you have received the product in a bad condition
            or if the packaging is tampered with or damaged before delivery,
            please refuse to accept the package and return the package to the
            delivery person. Please contact our customer service for initiating
            the replacement and send us the images/snapshots of the damaged
            product. Once our returns section receives and verifies the product,
            we will arrange for a replacement or a refund as the case may be.
            Please note that we cannot promise a replacement for all products as
            it will depend on the availability of the stock and replacement
            product. In such cases, we will offer only a refund.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">
            REFUND POLICY:
          </h3>
          <p className="text-gray-600 mb-6">
            If Refund request is accepted, refunds will be made in the same form
            that the payment is received within 10 working days from the date of
            cancellation of order.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">
            CUSTOMER SUPPORT:
          </h3>
          <p className="text-gray-600 mb-6">
            Also, please email us at support@gauraaj.org mentioning your Order
            ID. We will personally ensure that a brand new replacement is issued
            to you with no additional cost. Please make sure that the original
            product tag and packing is intact when you send us the product back.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">
            EXCLUSIONS:
          </h3>
          <p className="text-gray-600 mb-6">
            Notwithstanding anything stated herein above, the following products
            shall not be eligible for return or replacement, viz:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-4">
            <li>
              Any product that exhibits physical damage to the box or to the
              product;
            </li>
            <li>
              Any product that is returned without all original packaging and
              accessories, including the retail box, manuals, and all other
              items originally included with the product at the time of
              delivery, including any gift (free items) associated with it;
            </li>
            <li>
              Any product without a valid, readable, untampered serial number,
              including but not limited to products with missing, damaged,
              altered, or otherwise unreadable serial number;
            </li>
            <li>
              Any product from which the UPC (Universal Product Code) has been
              removed from its original packaging.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
