import { connectDb } from "@/helper/connectDB";
import StudentSchema from "@/models/studentModel";
import StudentPaymentBillSchema from "@/models/studentPaymentModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDb();
    const studentBills = await StudentPaymentBillSchema.find();
    const allStudents = await StudentSchema.find();

    const billMap = new Map(
      studentBills.map((bill) => [bill.studentID.toString(), bill])
    );

    const mergedData = allStudents.map((student) => {
      const studentBill = billMap.get(student._id.toString());
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
        billGeneratedMonth: studentBill ? studentBill.billGeneratedMonth : null,
      };
    });
    mergedData.sort((a, b) => a.class - b.class);
    return NextResponse.json(mergedData, { status: 200 });
  } catch (error) {
    console.error("Error fetching student data:", error);
    return NextResponse.json(
      { error: "Failed to fetch student data." },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  await connectDb();
  const body = await request.json();
  const allBills = await StudentPaymentBillSchema.find();
  allBills.forEach(async (bill) => {
    if (bill.billGeneratedMonth != new Date().getMonth()) {
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
      bill.billGeneratedMonth = new Date().getMonth();
      await bill.save();
      const studentDetail = await StudentSchema.findById(bill.studentID);
      studentDetail.otherFee = bill.dueFee;
      await studentDetail.save();
    }
  });
  return NextResponse.json(
    {
      msg: "Bill generated successfully. You may see the students bill after clicking on Show Bill button.",
    },
    { status: 200 }
  );
};
