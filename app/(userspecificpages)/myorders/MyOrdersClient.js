import React from "react";
import Link from "next/link";

const MyOrdersClient = ({ myOrders }) => {
  return (
    <div className="w-screen">
      <div className="mx-auto mt-8 max-w-screen-lg px-2">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-base font-bold text-gray-900 dark:text-dark-primaryText">
            My Orders
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border shadow dark:bg-dark-secondaryBackground">
          <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
            <thead className="hidden border-b lg:table-header-group">
              <tr className="">
                <td
                  width="50%"
                  className="whitespace-normal py-4 text-sm font-bold text-gray-500 dark:text-dark-primaryText sm:px-6"
                >
                  Order ID
                </td>

                <td className="whitespace-normal py-4 text-sm font-bold text-gray-500 dark:text-dark-primaryText sm:px-6">
                  Date
                </td>

                <td className="whitespace-normal py-4 text-sm font-bold text-gray-500 dark:text-dark-primaryText sm:px-6">
                  Amount
                </td>

                <td className="whitespace-normal py-4 text-sm font-bold text-gray-500 dark:text-dark-primaryText sm:px-6">
                  Status
                </td>
              </tr>
            </thead>

            <tbody className="lg:border-gray-300">
              {myOrders &&
                myOrders.map((item) => {
                  return (
                    <tr key={item._id} className="">
                      <td
                        width="50%"
                        className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 dark:text-dark-primaryText sm:px-6"
                      >
                        <Link
                          href={`${process.env.NEXT_PUBLIC_HOST}/order?id=${item._id}`}
                        >
                          <div className="mt-1">
                            <p className="hover:underline  font-normal text-gray-500 dark:text-dark-primaryText">
                              {item.orderId}
                            </p>
                          </div>
                        </Link>
                      </td>

                      <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 dark:text-dark-primaryText sm:px-6 lg:table-cell">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>

                      <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 dark:text-dark-primaryText lg:text-left">
                        Rs. {item.amount}
                        <div
                          className={`flex mt-1 capitalize ml-auto w-fit items-center rounded-full ${
                            (item.status.toLowerCase() == "pending" &&
                              "bg-blue-600") ||
                            (item.status.toLowerCase() == "delivered" &&
                              "bg-green-600") ||
                            (item.status.toLowerCase() == "cancelled" &&
                              "bg-red-600")
                          } py-2 px-3 text-left text-xs font-medium text-white lg:hidden`}
                        >
                          {item.status}
                        </div>
                      </td>

                      <td className="whitespace-no-wrap capitalize hidden py-4 text-sm font-normal text-gray-500 dark:text-dark-primaryText sm:px-6 lg:table-cell">
                        <div
                          className={`inline-flex items-center rounded-full ${
                            (item.status.toLowerCase() === "pending" &&
                              "bg-blue-600") ||
                            (item.status.toLowerCase() === "delivered" &&
                              "bg-green-600") ||
                            (item.status.toLowerCase() === "cancelled" &&
                              "bg-red-600")
                          } py-2 px-3 text-xs text-white`}
                        >
                          {item.status}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersClient;
