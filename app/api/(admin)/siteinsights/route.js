import connectDb from "@/dbconnection/mongoose";
import Admin from "@/models/Admin";
import Order from "@/models/Order";
import User from "@/models/User";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function GET(request) {
  try {
    // connecting database
    await connectDb();

    // getting token from searchParams
    const token = await request.nextUrl.searchParams.get("token");

    // verifying details from token in request
    const verifyDetails = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    // finding if admin with token details email exists in our database
    const adminDetails = await Admin.findOne({ email: verifyDetails.email });

    // if admin email and name in database matches with the jwt email and name(admin) then
    if (
      adminDetails._id == verifyDetails.id &&
      adminDetails.email == verifyDetails.email
    ) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // getting current month for later usage
      const presentMonth = new Date().getMonth();
      // getting previous month for later usage
      // here we are checking if current month is 0 (january) so instead of doing subracting 1 from current month simply place 11 (december)
      const pastMonth = presentMonth == 0 ? 11 : presentMonth - 1;

      const orders = await Order.find();

      let totalRevenue = 0;
      // calculating total revenue
      for (let e in orders) {
        totalRevenue += orders[e].amount;
      }

      // function for taking out revenue of last 6 months
      const calculateRevenueOfLast6Months = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // Months start from 0 (January is 0)

        const monthsRevenue = {};

        for (let i = 5; i >= 0; i--) {
          const targetMonth = currentMonth - i;
          const targetYear = currentYear + Math.floor(targetMonth / 12);
          const adjustedMonth = ((targetMonth % 12) + 12) % 12;

          const currentMonthOrders = orders.filter((order) => {
            const orderDate = new Date(order.createdAt);
            const orderYear = orderDate.getFullYear();
            const orderMonth = orderDate.getMonth();

            return orderYear === targetYear && orderMonth === adjustedMonth;
          });

          let currentMonthRevenue = 0;

          for (let order of currentMonthOrders) {
            currentMonthRevenue += order.amount;
          }

          // setting the key of months name along with the value of its revenue
          // months is defined above
          monthsRevenue[months[adjustedMonth]] = currentMonthRevenue;
        }

        return monthsRevenue;
      };

      const monthsRevenue = calculateRevenueOfLast6Months();

      // calculating ratio of presentMonth Revenue from pastMonth
      // presentMonth and past months are defined above in numbers getting value of presentMonth in months array and then the value will be key of months revenue so getting value of it then
      // e.g presentMonth = 0, months[0] = "January", so monthsRevenue["January"] will be the value of  present Month
      const revenueRatio =
        monthsRevenue[months[presentMonth]] == 0 &&
        monthsRevenue[months[pastMonth]] == 0
          ? 0
          : (monthsRevenue[months[presentMonth]] > 0 &&
            monthsRevenue[months[pastMonth]] == 0
              ? 100
              : (monthsRevenue[months[presentMonth]] -
                  monthsRevenue[months[pastMonth]]) /
                monthsRevenue[months[pastMonth]]) * 100;

      // number of orders from different citie

      const findOrdersFromCities = () => {
        // initializing blank object
        const ordersInCities = {};

        //running loop on every item of order
        orders.map((order) => {
          // checking of keys of ordersInCities includes the city of order placed
          if (Object.keys(ordersInCities).includes(order.city)) {
            // if it already includes then adding 1 in its value
            ordersInCities[order.city] = ordersInCities[order.city] + 1;
          } else {
            // if not then defining the key as city and its value as 1
            ordersInCities[order.city] = 1;
          }
        });

        return ordersInCities;
      };

      const ordersInCities = findOrdersFromCities();

      // getting total delivered orders
      const deliveredOrders = await Order.find({ status: "delivered" });

      // getting total successfull sales from delivered orders
      const totalSales = deliveredOrders.length;

      // function for taking out revenue of last 6 months
      const calculateSalesOfLast6Months = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // Months start from 0 (January is 0)

        const monthsSales = {};

        for (let i = 5; i >= 0; i--) {
          const targetMonth = currentMonth - i;
          const targetYear = currentYear + Math.floor(targetMonth / 12);
          const adjustedMonth = ((targetMonth % 12) + 12) % 12;

          const currentMonthSales = deliveredOrders.filter((order) => {
            const orderDate = new Date(order.createdAt);
            const orderYear = orderDate.getFullYear();
            const orderMonth = orderDate.getMonth();

            return orderYear === targetYear && orderMonth === adjustedMonth;
          });

          monthsSales[months[adjustedMonth]] = currentMonthSales.length;
        }

        return monthsSales;
      };

      const monthsSales = calculateSalesOfLast6Months();

      //  calculating ratio of sales
      const salesRatio =
        monthsSales[months[presentMonth]] == 0 &&
        monthsSales[months[pastMonth]] == 0
          ? 0
          : (monthsSales[months[presentMonth]] > 0 &&
            monthsSales[months[pastMonth]] == 0
              ? 100
              : (monthsSales[months[presentMonth]] -
                  monthsSales[months[pastMonth]]) /
                monthsSales[months[pastMonth]]) * 100;

      // getting total users
      const users = await User.find();

      // getting total users
      const totalUsers = users.length;

      // function for taking out revenue of last 6 months
      const calculateUsersOfLast6Months = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // Months start from 0 (January is 0)

        const monthsUsers = {};

        for (let i = 5; i >= 0; i--) {
          const targetMonth = currentMonth - i;
          const targetYear = currentYear + Math.floor(targetMonth / 12);
          const adjustedMonth = ((targetMonth % 12) + 12) % 12;

          const currentMonthUsers = users.filter((user) => {
            const userDate = new Date(user.createdAt);
            const userYear = userDate.getFullYear();
            const userMonth = userDate.getMonth();

            return userYear === targetYear && userMonth === adjustedMonth;
          });

          monthsUsers[months[adjustedMonth]] = currentMonthUsers.length;
        }

        return monthsUsers;
      };

      const monthsUsers = calculateUsersOfLast6Months();

      // calculating ratio of users of current month with previous month
      const usersRatio =
        monthsUsers[months[presentMonth]] == 0 &&
        monthsUsers[months[pastMonth]] == 0
          ? 0
          : (monthsUsers[months[presentMonth]] > 0 &&
            monthsUsers[months[pastMonth]] == 0
              ? 100
              : (monthsUsers[months[presentMonth]] -
                  monthsUsers[months[pastMonth]]) /
                monthsUsers[months[pastMonth]]) * 100;

      // giving response
      return NextResponse.json(
        {
          success: true,
          ordersInCities,
          revenue: {
            totalRevenue,
            monthsRevenue,
            revenueRatio,
          },
          sales: {
            totalSales,
            monthsSales,
            salesRatio,
          },
          users: {
            totalUsers,
            monthsUsers,
            usersRatio,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "UnAuthorized Access" },
        { status: 405 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something Went Wrong!", error },
      { status: 500 }
    );
  }
}
