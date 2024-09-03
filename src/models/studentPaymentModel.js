import { Schema, model, models } from "mongoose";
const StudentPaymentSchema = new Schema({
  billGeneratedMonth: {
    type: Number,
    required: true,
    default: -1,
  },
  isExamFeeAdded: {
    type: Boolean,
    default: false,
  },
  studentID: {
    type: String,
    required: true,
  },
  tuitionFee: {
    type: Number,
    required: true,
  },
  lastRemainingFee: {
    type: Number,
    default: 0,
  },
  transportFee: {
    type: Number,
    required: true,
  },
  examFee: {
    type: Number,
    required: true,
  },
  billPaymentDetail: [
    {
      date: {
        type: Date,
        default: Date.now, 
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  otherFee: {
    type: Number,
    required: true,
  },
  dueFee: {
    type: Number,
    default: 0,
  },
  currenMonthPayedBill: {
    type: Number,
    default: 0,
  },
});

const StudentPaymentBillSchema =
  models.StudentPaymentBill ||
  model("StudentPaymentBill", StudentPaymentSchema);
export default StudentPaymentBillSchema;
