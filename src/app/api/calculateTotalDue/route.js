import { connectDb } from "@/helper/connectDB";
import StudentPaymentBillSchema from "@/models/studentPaymentModel";

import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDb();
  const dueFee = await StudentPaymentBillSchema.find({}, "dueFee");
  const currenMonthPayed = await StudentPaymentBillSchema.find(
    {},
    "currenMonthPayedBill"
  );
  let totalFee = 0;
  dueFee.forEach((fee) => {
    totalFee += +fee.dueFee;
  });

  let totalPayed = 0;
  currenMonthPayed.forEach((payed) => {
    totalPayed += +payed.currenMonthPayedBill;
  });
  return NextResponse.json(
    { totalFee, totalPayed },
    { headers: { "Cache-Control": "no-store" } }
  );
};
