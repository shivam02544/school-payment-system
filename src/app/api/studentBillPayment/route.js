import { connectDb } from "@/helper/connectDB";
import StudentSchema from "@/models/studentModel";
import StudentPaymentBillSchema from "@/models/studentPaymentModel";
import { NextResponse } from "next/server";
export const GET = async (request) => {
  await connectDb();
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const className = searchParams.get("class");
  const studentDetail = await StudentSchema.find({
    name: name,
    class: className,
  });
  if (studentDetail.length == 0) return NextResponse.json({ name: true });
  const studentBills = await Promise.all(
    studentDetail.map(async (student) => {
      const studentBill = await StudentPaymentBillSchema.findOne({
        studentID: student._id,
      });
      return {
        studentID: student._id,
        name: student.name,
        fatherName: student.fatherName,
        class: student.class,
        village: student.village,
        tuitionFee: studentBill ? studentBill.tuitionFee : null,
        transportFee: studentBill ? studentBill.transportFee : null,
        examFee: studentBill ? studentBill.examFee : null,
        lastRemainingFee: studentBill ? studentBill.lastRemainingFee : null,
        otherFee: studentBill ? studentBill.otherFee : null,
        dueFee: studentBill ? studentBill.dueFee : null,
        isExamFeeAdded: studentBill ? studentBill.isExamFeeAdded : null,
        paymentHistory: studentBill ? studentBill.billPaymentDetail : null,
      };
    })
  );
  return NextResponse.json(studentBills, { status: 200 });
};

export const POST = async (request) => {
  await connectDb();
  const body = await request.json();
  const studentID = body.studentID;
  let payedAmount = +body.amount;
  const studentBill = await StudentPaymentBillSchema.findOne({
    studentID: studentID,
  });
  studentBill.dueFee -= payedAmount;
  studentBill.currenMonthPayedBill += payedAmount;
  studentBill.billPaymentDetail.push({
    date: new Date(),
    amount: payedAmount,
  });
  await studentBill.save();
  const studentDetail = await StudentSchema.findById(studentID);
  studentDetail.otherFee = studentBill.dueFee;
  await studentDetail.save();
  const billData = {
    isExamFeeAdded: studentBill.isExamFeeAdded,
    tuitionFee: studentBill.tuitionFee,
    transportFee: studentBill.transportFee,
    examFee: studentBill.examFee,
    lastRemainingFee: studentBill.lastRemainingFee,
    otherFee: studentBill.otherFee,
    dueFee: studentBill.dueFee,
    name: studentDetail.name,
    class: studentDetail.class,
    fatherName: studentDetail.fatherName,
    village: studentDetail.village,
  };
  return NextResponse.json(billData, { status: 200 });
};
