"use client"
import HeaderAfterLogin from '@/components/HeaderAfterLogin'
import React, { useState } from 'react'
const page = () => {
  const [studentBill, setStudentBill] = useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  async function getStudentBill(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    const res = await fetch(`/api/studentBillPayment?name=${formObject.name}&class=${formObject.class}`)
    const data = await res.json();
    if (data.name) {
      alert("Student is not available")
      setStudentBill([]);
    } else {
      setStudentBill(data);
    }
  }

  async function payBill(index) {
    let payedAmount = prompt(`Your total amount: ${studentBill[index].dueFee}`);
    if (!payedAmount) {
      alert("Student payment is incomplete.");
      return
    }
    const res = await fetch("/api/studentBillPayment", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentID: studentBill[index].studentID, amount: payedAmount }),
    })
    const data = await res.json();
  }

  return (
    <div>
      <HeaderAfterLogin />
      <div className="z-10 sticky top-20 bg-white">
        <h1 className="text-center mt-2 font font-extrabold text-2xl bg-orange-600 text-white ">Student bill payment dashboard</h1>
        <div className="my-4 flex items-center justify-center shadow-sm h-20">
          <span className="text-lg font-bold my-2">Search student by ▶ </span>
          <form className="flex" onSubmit={(e) => getStudentBill(e)}>
            <input
              type="text"
              placeholder="Student name"
              className="input input-bordered w-full max-w-xs ml-2 "
              name="name"
              required
            />
            <input
              type="text"
              placeholder="Class"
              className="input input-bordered w-full max-w-xs ml-2 "
              name="class"
              required
            />
            <button className="btn font-bold text-lg ml-2 bg-orange-600 text-white " type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className='flex flex-wrap'>
        {

          studentBill.map((bill, index) => {
            return (
              <div key={bill.studentID} className="flex justify-center m-6 bg-gray-50 w-[65rem] p-6 rounded-md shadow-md">
                <div className="w-3/5 pr-4">
                  <h1 className="font-extrabold text-xl text-orange-600 mb-4">
                    New Progressive Public School Nauroo, Jehanabad
                  </h1>
                  <div className="flex flex-col space-y-2">
                    <span className="text-lg">
                      Name: <b className="text-lg">{bill.name}</b>
                    </span>
                    <span>Class: {bill.class}</span>
                    <span>Father's Name: {bill.fatherName}</span>
                    <span>Village: {bill.village}</span>
                    <span>Tuition Fee: ₹{bill.tuitionFee}</span>
                    <span>Transport Fee: ₹{bill.transportFee}</span>
                    <span>Exam Fee: ₹{bill.isExamFeeAdded ? bill.examFee : 0}</span>
                    <span>Previous Due: ₹{bill.lastRemainingFee}</span>
                    <span>Other Fee: ₹{bill.otherFee}</span>
                    <span>
                      Total Dues:{" "}
                      <span className="text-xl font-extrabold text-green-600">₹{bill.dueFee}</span>
                    </span>
                  </div>
                  <div className="flex items-center mt-6">
                    <button className="bg-red-600 text-white py-2 px-4 rounded" onClick={() => payBill(index)}>Pay</button>
                  </div>
                </div>
                <div className="w-1/2 h-96 pl-4 overflow-y-scroll">
                  <h1 className='font-bold text-gray-600'>Payment History</h1>
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {
                        bill.paymentHistory.map(history => {
                          return (
                            <tr key={history.date} className="border-b border-gray-200 hover:bg-gray-100">
                              <td className="py-3 px-6 text-left">{formatDate(history.date)}</td>
                              <td className="py-3 px-6 text-left">₹{history.amount}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default page