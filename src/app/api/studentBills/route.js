import { connectDb } from "@/helper/connectDB";
import SchoolDetail from "@/models/schoolDetailModel";
import StudentSchema from "@/models/studentModel";
import StudentPaymentBillSchema from "@/models/studentPaymentModel";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  await connectDb();
  const studentBills = await StudentPaymentBillSchema.find();
  const allStudent = await StudentSchema.find();
  const mergedData = allStudent.map((student) => {
    const studentBill = studentBills.find(
      (bill) => bill.studentID == student._id
    );
    return {
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
    };
  });

  return NextResponse.json(mergedData);
};
export const POST = async (request) => {
  await connectDb();
  const body = await request.json();
  const allBills = await StudentPaymentBillSchema.find();
  allBills.forEach(async (bill) => {
    bill.otherFee = body.otherFee;
    bill.lastRemainingFee = bill.dueFee;
    bill.dueFee =
      bill.lastRemainingFee +
      bill.tuitionFee +
      bill.otherFee +
      bill.transportFee;
    if (body.examFee == "yes") {
      bill.dueFee = bill.dueFee + bill.examFee;
      bill.isExamFeeAdded = true;
    } else {
      bill.isExamFeeAdded = false;
    }
    bill.currenMonthPayedBill = 0;
    await bill.save();
    const studentDetail = await StudentSchema.findById(bill.studentID);
    studentDetail.otherFee = bill.dueFee;
    await studentDetail.save();
  });
  let schoolDetail = await SchoolDetail.findOne();
  if (schoolDetail) {
    schoolDetail.billGeneratedMonth = new Date().getMonth();
    await schoolDetail.save();
  } else {
    schoolDetail = new SchoolDetail({
      billGeneratedMonth: new Date().getMonth(),
    });
    await schoolDetail.save();
  }
  return NextResponse.json({
    msg: "Bill generated successfully. You may see the students bill after clicking on Show Bill button.",
  });
};
