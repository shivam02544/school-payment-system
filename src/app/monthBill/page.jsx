"use client"
import HeaderAfterLogin from '@/components/HeaderAfterLogin'
import React, { useState } from 'react'
const MonthBill = () => {
    const apiUrl = process.env.API_URL || '';
    const [studentBills, SetStudentBills] = useState([]);
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    function printBill() {
        let printContents = document.getElementById("printableContent").innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;

    }
    const generateBill = (async (e) => {
        e.preventDefault();
        let res = await fetch(`${apiUrl}/api/schoolDetail`)
        let data = await res.json();
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        console.log(data);
        if (data.month == new Date().getMonth()) {
            alert("Bill is already generated for this month. You may click on show all bill button for get the students bill")
            document.getElementById("billGenBtn").disabled = true;
        } else {
            document.getElementById("billGenBtn").disabled = false;
            res = await fetch(`${apiUrl}/api/studentBills`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            })
            if (response.ok) {
                const result = await response.json();
                alert(result.msg);
            } else {
                alert("Failed to generate bill.");
            }
        }


    })
    async function showBill() {
        const res = await fetch(`${apiUrl}/api/studentBills`)
        const data = await res.json();
        SetStudentBills(data);
    }

    return (
        <div >
            <HeaderAfterLogin />
            <h1 className=" text-center mt-2 font font-extrabold text-2xl bg-orange-600 text-white ">Student monthly bill(s)</h1>
            <div className=' flex m-1 justify-between items-center'>
                <form className='flex gap-6 m-4 ' onSubmit={(e) => generateBill(e)}>
                    <div className='flex items-center text-lg gap-1'>
                        <span className='mr-2 text-orange-600'>Add the exam fee? </span>
                        <input id='no' type="radio" name="examFee" className="radio" value="no" defaultChecked />
                        <label htmlFor="no">No</label>
                        <input id='yes' type="radio" name="examFee" className="radio" value="yes" />
                        <label htmlFor="yes">Yes</label>
                    </div>
                    <div className='flex gap-4'>
                        <input required type="number" min='0' max='100000' placeholder='Other fee(s)' name='otherFee' className='input input-bordered w-full max-w-xs ml-2 text-orange-600' />
                        <button id='billGenBtn' type='submit' className='btn bg-red-600 font-extrabold text-white'>Generate bill</button>
                    </div>
                </form>
                <div className='flex gap-4 mx-2 '>
                    <button className='btn bg-orange-600 text-white font-extrabold' onClick={showBill}>Show all bills</button>
                    <button className='btn bg-orange-600 text-white font-extrabold' onClick={() => printBill()}>Print</button>
                </div>
            </div>
            <div id='printableContent'>
                <div className='flex flex-wrap justify-center'>
                    {
                        studentBills.map(studentBill => {
                            return (
                                <div key='0' className='border-2 border-black w-[22rem] flex flex-col items-center m-1'>
                                    <span className='text-sm'>Bill Payment Receipt</span>
                                    <div className='border-[1px] border-black text-sm'>
                                        <div className='flex flex-col items-center '>
                                            <h1 className=' font-bold text-lg px-1'>NEW PROGRESSIVE PUBLIC SCHOOL</h1>
                                            <span>Nauroo, Jehanabad</span>
                                        </div>
                                        <div className='px-3 flex justify-between'>
                                            <span>NAME: {studentBill.name}</span>
                                            <span>CLASS: {studentBill.class}</span>
                                        </div>
                                        <span className='px-3'>PARENT&apos;S NAME: {studentBill.fatherName}</span>
                                        <div className='px-3 flex justify-between'>
                                            <span>ADDRESS: {studentBill.village}</span>
                                            <span>DUES ON: {monthName[new Date().getMonth()]}</span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-[96%] my-1 text-xs'>
                                        <div className='flex justify-between'>
                                            <span>TUITION FEE:</span>
                                            <span>₹{studentBill.tuitionFee}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>TRANSPORT FEE:</span>
                                            <span>₹{studentBill.transportFee}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>EXAM FEE:</span>
                                            <span>₹{studentBill.isExamFeeAdded ? studentBill.examFee : 0}</span>
                                            {console.log(studentBill.isExamFeeAdded)}
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>PREVIOUS DUES:</span>
                                            <span>₹{studentBill.lastRemainingFee}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>OTHER FEE:</span>
                                            <span>₹{studentBill.otherFee}</span>
                                        </div>
                                        <span>------------------------------------------------------------</span>
                                        <div className='flex justify-between'>
                                            <span>TOTAL DUES:</span>
                                            <span>₹{studentBill.dueFee}</span>
                                        </div>
                                    </div>
                                    <div className='text-xs flex flex-col w-[96%] border-[1px] border-black mb-2'>
                                        <span>1. Fee Payment date 1 to 10 of the every month.</span>
                                        <span>2. If Payment will not be made up to last day of the month ₹50/- will be charged as late fine.</span>
                                        <span>3. If Payment will not be paid before the due date then admission will be cancelled. </span>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default MonthBill