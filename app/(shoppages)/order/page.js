import React from "react";
const orderDetails = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/orderdetails?id=${id}`
  );
  return res.json();
};

const Order = async ({ searchParams }) => {
  // TODO
  // To Change the profile image of user

  let details = await orderDetails(searchParams.id); // getting order details based on searchparams query id

  const {
    name,
    email,
    phone,
    orderId,
    payMethod,
    products,
    address,
    city,
    amount,
    status,
    createdAt,
  } = details;

  const date = new Date(createdAt).toLocaleString();
  return (
    <>
      {!details.error ? (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <div className="flex justify-start item-start space-y-2 flex-col ">
            <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800 dark:text-dark-primaryText">
              Order #{orderId}
            </h1>
            <p className="text-base font-medium leading-6 text-gray-600 dark:text-dark-fourthBackground">
              {date}
            </p>
          </div>
          <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start bg-gray-50 dark:bg-dark-secondaryBackground px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800 dark:text-dark-primaryText">
                  Customer’s Cart
                </p>
                {products &&
                  Object.keys(products).map((item) => {
                    return (
                      <div
                        key={item}
                        className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                      >
                        <div className="pb-4 md:pb-8 w-full md:w-40">
                          <img
                            className="w-full hidden md:block"
                            src={products[item].img}
                            alt={products[item].name}
                          />
                          <img
                            className="w-full md:hidden"
                            src={products[item].img}
                            alt={products[item].name}
                          />
                        </div>
                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                          <div className="w-full flex flex-col justify-start items-start space-y-8">
                            <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800 dark:text-dark-primaryText">
                              {products[item].name}
                            </h3>
                            <div className="flex justify-start items-start flex-col space-y-2">
                              <p className="text-sm leading-none text-gray-800 dark:text-dark-primaryText">
                                <span className="text-gray-300">Size: </span>{" "}
                                {products[item].size}
                              </p>
                              <p className="text-sm leading-none text-gray-800 dark:text-dark-primaryText">
                                <span className="text-gray-300">Color: </span>{" "}
                                {products[item].variant}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between space-x-8 items-start w-full">
                            <p className="text-base xl:text-lg leading-6">
                              Rs. {products[item].price}
                            </p>
                            <p className="text-base xl:text-lg leading-6 text-gray-800 dark:text-dark-primaryText">
                              {products[item].qty}
                            </p>
                            <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800 dark:text-dark-primaryText">
                              {products[item].price * products[item].qty}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-dark-secondaryBackground space-y-6   ">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800 dark:text-dark-primaryText">
                    Summary
                  </h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between  w-full">
                      <p className="text-base leading-4 text-gray-800 dark:text-dark-primaryText">
                        Subtotal
                      </p>
                      <p className="text-base leading-4 text-gray-600 dark:text-dark-primaryText">
                        Rs. {amount - 100}
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base leading-4 text-gray-800 dark:text-dark-primaryText">
                        Shipping
                      </p>
                      <p className="text-base leading-4 text-gray-600 dark:text-dark-primaryText">
                        Rs. 100
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base font-semibold leading-4 text-gray-800 dark:text-dark-primaryText">
                      Total
                    </p>
                    <p className="text-base font-semibold leading-4 text-gray-600 dark:text-dark-primaryText">
                      Rs. {amount}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-dark-secondaryBackground space-y-6   ">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800 dark:text-dark-primaryText">
                    Shipping
                  </h3>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex justify-center items-center space-x-4">
                      <div className="w-8 h-8">
                        <img
                          className="w-full h-full"
                          alt="logo"
                          src="https://i.ibb.co/L8KSdNQ/image-3.png"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-center">
                        <p className="text-lg leading-6 font-semibold text-gray-800 dark:text-dark-primaryText">
                          DPD Delivery
                          <br />
                          <span className="font-normal">
                            Delivery with 24 Hours
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold leading-6 text-gray-800 dark:text-dark-primaryText">
                      $8.00
                    </p>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <button className="hover:bg-black dark:hover:bg-dark-primaryBackground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                      View Carrier Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-dark-secondaryBackground w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800 dark:text-dark-primaryText">
                Customer
              </h3>
              <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                  <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                    <img
                      src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                      alt="avatar"
                    />
                    <div className=" flex justify-start items-start flex-col space-y-2">
                      <p className="text-base capitalize font-semibold leading-4 text-left text-gray-800 dark:text-dark-primaryText">
                        {name}
                      </p>
                      <p className="text-sm leading-5 text-gray-600 dark:text-dark-fourthBackground">
                        {phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                        stroke="#1F2937"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 7L12 13L21 7"
                        stroke="#1F2937"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="cursor-pointer lowercase text-sm leading-5 text-gray-800 dark:text-dark-primaryText">
                      {email}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                  <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                    <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                      <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800 dark:text-dark-primaryText">
                        Shipping Address
                      </p>
                      <p className="w-48 capitalize lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 dark:text-dark-primaryText">
                        {address}
                      </p>
                    </div>
                    <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                      <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800 dark:text-dark-primaryText">
                        City
                      </p>
                      <p className="w-48 capitalize lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 dark:text-dark-primaryText">
                        {city}
                      </p>
                    </div>
                    <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                      <p className="text-base font-semibold  leading-4 text-center md:text-left text-gray-800 dark:text-dark-primaryText">
                        Payment Method
                      </p>
                      <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 dark:text-dark-primaryText">
                        {payMethod == "cod"
                          ? "Cash On Delivery"
                          : "Online Payment"}
                      </p>
                    </div>
                    <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                      <p className="text-base font-semibold  leading-4 text-center md:text-left text-gray-800 dark:text-dark-primaryText">
                        Status
                      </p>
                      <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 dark:text-dark-primaryText">
                        {status}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                    <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 dark:bg-[#ed1c24] focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-800 dark:border-white font-medium w-96 2xl:w-full text-base leading-4 text-gray-800 dark:text-white">
                      Edit Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Order;
