"use client"
import HeaderAfterLogin from '@/components/HeaderAfterLogin'
import React, { useEffect, useState } from 'react'

const BillPaymentSlider = () => {
    const apiUrl = process.env.API_URL || '';
    const [value, setValue] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [studentData, setStudentData] = useState();
    const [currentStudentIndex, setCurrentStudentIndex] = useState("a1");

    const handleInput = (e) => {
        const input = e.target.value;
        if (/^\d*$/.test(input)) {
            setValue(input);
            setIsButtonDisabled(input.length === 0);
        }
    };

    const handlePay = async () => {
        document.body.style.pointerEvents = "none";
        const res = await fetch(`${apiUrl}/api/studentBillPayment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ studentID: studentData._id, amount: value }),
        })
        if (!res.ok) {
            alert("Something went wrong plz refresh the page...")
            return
        }
        document.body.style.pointerEvents = "auto";
        const data = await res.json()
        setStudentData(data)
        setValue("")
    };
    const nextStudent = async () => {
        setValue('');
        const prefix = currentStudentIndex.replace(/\d+$/, '');
        const numericPart = currentStudentIndex.match(/\d+$/);
        const number = numericPart ? parseInt(numericPart[0], 10) + 1 : 1;
        setCurrentStudentIndex(prefix + number)
        document.body.style.pointerEvents = "none";
        const res = await fetch(`${apiUrl}/api/updateRecord?pageId=${prefix + number}`)
        if (!res.ok) {
            alert("Something went wrong plz refrese the tab")
            document.body.style.pointerEvents = "auto";
            return
        }
        const data = await res.json()
        if (!data) {
            console.log(studentData);
            alert("No student data found...")
            document.body.style.pointerEvents = "auto"
            return
        }
        setStudentData(data);
        document.body.style.pointerEvents = "auto"
        console.log(studentData);

    }
    const backStudent = async () => {
        setValue('');
        const prefix = currentStudentIndex.replace(/\d+$/, '');
        const numericPart = currentStudentIndex.match(/\d+$/);
        let number = numericPart ? parseInt(numericPart[0], 10) - 1 : 1;
        if (number == 0)
            number = 1
        setCurrentStudentIndex(prefix + number)
        document.body.style.pointerEvents = "none";
        const res = await fetch(`${apiUrl}/api/updateRecord?pageId=${prefix + number}`)
        if (!res.ok) {
            alert("Something went wrong plz refrese the tab")
            document.body.style.pointerEvents = "auto";
            return
        }
        const data = await res.json()
        if (!data) {
            alert("No student data found...")
            document.body.style.pointerEvents = "auto"
            return
        }
        setStudentData(data);
        document.body.style.pointerEvents = "auto"
    }
    const searchBill = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const pageId = formData.get('pageId');
        if (!pageId) {
            alert("Please enter a Page ID");
            return;
        }
        document.body.style.pointerEvents = "none";

        const res = await fetch(`${apiUrl}/api/updateRecord?pageId=${pageId}`)
        if (!res.ok) {
            alert("Something went wrong plz refrese the tab")
            document.body.style.pointerEvents = "auto";
            return
        }
        setCurrentStudentIndex(pageId);
        const data = await res.json()
        if (!data) {
            alert("No student data found...")
            document.body.style.pointerEvents = "auto"
        }
        setStudentData(data);
        document.body.style.pointerEvents = "auto"
    }


    useEffect(() => {
        fetch(`${apiUrl}/api/updateRecord?pageId=${currentStudentIndex}`)
            .then(res => res.json())
            .then(data => {
                setStudentData(data);

            })

    }, [currentStudentIndex])
    return (

        <>
            <HeaderAfterLogin />
            {
                (
                    <div className='flex flex-col items-center justify-center h-[86vh]'>
                        <form className='flex gap-3 my-2' onSubmit={(e) => searchBill(e)}>
                            <input
                                required
                                name='pageId'
                                type="text"
                                placeholder="Page ID"
                                className="input input-bordered text-orange-700 text-center text-xl"
                            />
                            <button type='submit' className='btn bg-orange-600 text-white '>Search</button>
                        </form>
                        <div className='border-[3px] border-orange-600 w-[30%] h-[70%] rounded-lg'>
                            <h1 className='py-1 text-2xl font-extrabold text-center text-white bg-orange-600'>Bill Payment</h1>
                            <div className='p-4 flex flex-col items-center'>
                                <h1 className='text-2xl font-extrabold text-orange-600'>{studentData?.name || 'Loading...'}</h1>
                                <div className='flex justify-between w-80'>
                                    <p>Class: {studentData?.class || 'Loading...'}</p>
                                    <p>Village: {studentData?.village || 'Loading...'}</p>
                                </div>
                                <div className='flex justify-between w-80'>
                                    <p>{studentData?.fatherName || 'Loading...'}</p>
                                    <p>{studentData?.mobileNumber || 'Loading...'}</p>
                                </div>
                                <div className='flex justify-between w-80'>
                                    <p>Tuition Fee: {studentData?.tuitionFee || 'Loading...'}</p>
                                    <p>Transport Fee: {studentData?.transportFee || 'Loading...'}</p>
                                </div>
                                <p className='text-xl font-bold text-gray-400 mt-3'>Bill to Pay:-</p>
                                <p className='text-2xl font-extrabold text-orange-600'>₹{studentData?.otherFee || 'Loading...'}</p>
                                <div>
                                    <input

                                        type="text"
                                        value={value}
                                        onChange={handleInput}
                                        placeholder="Amount"
                                        className="input input-bordered w-full text-center text-xl"
                                    />
                                    <button
                                        disabled={isButtonDisabled}
                                        onClick={handlePay}
                                        className='btn bg-orange-600 w-full my-4 text-lg text-white'
                                    >
                                        Pay
                                    </button>
                                </div>
                                <p className='text-sm text-gray-400'>{studentData?.pageId || 'no data found'}</p>
                            </div>
                        </div>
                        <div className='flex justify-between w-[20%] m-4'>
                            <button onClick={backStudent} className='btn bg-gray-500 w-[25%] text-white'>Back</button>
                            <button onClick={nextStudent} className='btn btn-primary w-[25%] text-white'>Next</button>
                        </div>
                    </div>
                )
            }

        </>
    );
};

export default BillPaymentSlider;
