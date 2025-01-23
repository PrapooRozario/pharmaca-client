import { buttonVariants } from "@/components/ui/button";
import { Button } from "@headlessui/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router";

const Invoice = () => {
  const { state } = useLocation();
  const handleDownloadPdf = async () => {
    const element = document.querySelector("#element");
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.7);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let position = 0;

    if (imgHeight > pdfHeight) {
      let heightLeft = imgHeight;

      while (heightLeft > 0) {
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        position -= pdfHeight;

        if (heightLeft > 0) {
          pdf.addPage();
        }
      }
    } else {
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
    }

    pdf.save("invoice.pdf");
  };
  return (
    //    < !--Invoice -- >
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
      <Helmet>
        <title> Pharmaca | Invoice</title>
      </Helmet>
      <div className="sm:w-11/12 lg:w-3/4 mx-auto">
        <div id="element">
          {/* <!-- Card --> */}
          <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl">
            {/* <!-- Grid --> */}
            <div className="flex justify-between">
              <div>
                <img src="/pharmaca.svg"></img>
              </div>
              {/* <!-- Col --> */}

              <div className="text-end">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Invoice #
                </h2>
                <span className="mt-1 block text-gray-500">
                  {state?.transactionId}
                </span>

                <address className="mt-4 not-italic text-gray-800">
                  Dhaka
                  <br />
                  Bashundhara R/A
                  <br />
                  Bangladesh <br />
                </address>
              </div>
              {/* <!-- Col --> */}
            </div>
            {/* <!-- End Grid --> */}

            {/* <!-- Grid --> */}
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Bill to:
                </h3>
                <h3 className="text-lg font-semibold text-gray-800">
                  {state?.user_name}
                </h3>
                <address className="mt-1 not-italic text-gray-500">
                  {state?.user_email}
                </address>
              </div>
              {/* <!-- Col --> */}

              <div className="sm:text-end space-y-2">
                {/* <!-- Grid --> */}
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Invoice date:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {moment(state?.createdAt).format("L")}
                    </dd>
                  </dl>
                </div>
                {/* <!-- End Grid --> */}
              </div>
              {/* <!-- Col --> */}
            </div>
            {/* <!-- End Grid --> */}

            {/* <!-- Table --> */}
            <div className="mt-6">
              <div className="border border-gray-200 p-4 rounded-lg space-y-4">
                <div className="hidden sm:grid sm:grid-cols-5">
                  <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                    Item
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    Rate
                  </div>
                  <div className="text-end text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </div>
                </div>

                <div className="hidden sm:block border-b border-gray-200 dark:border-neutral-700"></div>
                {state?.products?.map((product) => (
                  <div key={product?._id} className="mt-6">
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      <div className="col-span-full sm:col-span-2">
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                          Item
                        </h5>
                        <p className="font-medium text-gray-800">
                          {product?.itemName}
                        </p>
                      </div>
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                          Qty
                        </h5>
                        <p className="text-gray-800">{product?.quantity}</p>
                      </div>
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                          Rate
                        </h5>
                        <p className="text-gray-800">
                          ${product?.perUnitPrice}
                        </p>
                      </div>
                      <div>
                        <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                          Amount
                        </h5>
                        <p className="sm:text-end text-gray-800">
                          ${product?.totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* End Table */}

            {/* <!-- Flex --> */}
            <div className="mt-8 flex sm:justify-end">
              <div className="w-full max-w-2xl sm:text-end space-y-2">
                {/* <!-- Grid --> */}
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Subtotal:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      ${state?.totalAmount}
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Total:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      ${state?.totalAmount}
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Tax:
                    </dt>
                    <dd className="col-span-2 text-gray-500">$00</dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Amount paid:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      ${state?.totalAmount}
                    </dd>
                  </dl>
                </div>
                {/* <!-- End Grid --> */}
              </div>
            </div>
            {/* <!-- End Flex --> */}

            <div className="mt-8 sm:mt-12">
              <h4 className="text-lg font-semibold text-gray-800">
                Thank you!
              </h4>
              <p className="text-gray-500">
                If you have any questions concerning this invoice, use the
                following contact information:
              </p>
              <div className="mt-2">
                <p className="block text-sm font-medium text-gray-800">
                  pharmaca@help.com
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              © {new Date().getFullYear()} Pharmaca
            </p>
          </div>
          {/* <!-- End Card --> */}
        </div>
        {/* <!-- Buttons --> */}
        <div className="mt-6 flex justify-end gap-x-3">
          <Button
            onClick={() => handleDownloadPdf()}
            className={`${buttonVariants({
              variant: "primary",
            })}`}
          >
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Invoice PDF
          </Button>
        </div>
        {/* <!-- End Buttons --> */}
      </div>
    </div>
  );
};

export default Invoice;
