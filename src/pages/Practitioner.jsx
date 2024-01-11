const Practitioner = () => {
  return (
    <>
      <div
        className="max-w-2xl p-8 mx-auto my-12 overflow-x-auto border rounded-md shadow-lg bg-card text-card-foreground dark:border-gray-800"
        data-v0-t="card"
      >
        <div className="space-y-1.5 p-6 flex flex-col items-center">
          <img
            className="mb-4"
            src="data:image/png;base64,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"
            width={100}
            height={100}
            alt="Company Logo"
            style={{ aspectRatio: "100/100", objectFit: "cover" }}
          />
          <h3 className="mb-2 text-3xl font-semibold tracking-tight">
            Voucher
          </h3>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Redeem Your Coupon
          </p>
        </div>
        <div className="p-6 mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Voucher Code:</p>
            <div className="inline-flex items-center px-3 py-1 text-lg font-bold text-white transition-colors bg-green-500 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80">
              ABC123
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Expiration Date:</p>
            <p className="text-lg">December 31, 2024</p>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-lg font-semibold">Itemized Section:</p>
            <table className="w-full text-lg text-gray-500 dark:text-gray-400">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="pb-2">Item Name</th>
                  <th className="pb-2">Quantity</th>
                  <th className="pb-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Item 1</td>
                  <td>2</td>
                  <td>$20</td>
                </tr>
                <tr>
                  <td>Item 2</td>
                  <td>3</td>
                  <td>$30</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-lg font-semibold">Subtotal:</p>
            <p className="text-lg">$50</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Taxes (10%):</p>
            <p className="text-lg">$5</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg">$55</p>
          </div>
          <div>
            <p className="mb-2 text-lg font-semibold">
              Terms &amp; Conditions:
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              This voucher is only valid until the expiration date mentioned
              above. It cannot be combined with other promotions and is not
              refundable.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              className="mt-6"
              src="https://cdn.shopify.com/shopifycloud/help/assets/manual/sell-in-person/hardware/barcode-scanner/1d-barcode-4fbf513f48675746ba39d9ea5078f377e5e1bb9de2966336088af8394b893b78.png"
              width={200}
              height={100}
              alt="Barcode"
              style={{ aspectRatio: "200/100", objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="flex flex-col justify-start pt-4 mt-8 border-t items-star dark:border-gray-800">
          <div className="flex items-center justify-start gap-4 mb-2">
            <p className="text-lg font-semibold">Contact Us:</p>
            <p className="text-lg">info@company.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Practitioner;
