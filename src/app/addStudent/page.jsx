"use client"
import HeaderAfterLogin from '@/components/HeaderAfterLogin'
import React from 'react'
const AddStudent = () => {
    const apiUrl = process.env.API_URL || '';
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        try {
            const res = await fetch(`${apiUrl}/api/studentData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            })
            const data = await res.json();
            alert(data.msg)

        } catch (error) {
            console.log(error);
        }
        e.target.reset()
    }
    return (
        <div>
            <HeaderAfterLogin />
            <div className='flex flex-col justify-center items-center gap-2 mt-8 '>
                <h1 className='font-extrabold text-2xl text-orange-600 '>New Student Information</h1>
                <form
                    className='space-y-4 text-orange-600'
                    onSubmit={(e) => handleSubmit(e)}

                >
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder="Student name"
                            className="input input-bordered w-full max-w-xs"
                            name='name'
                            required
                        />
                        <input
                            type="text"
                            placeholder="Father&apos;s name"
                            className="input input-bordered w-full max-w-xs"
                            name='fatherName'
                            required
                        />
                    </div>
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder="Mother&apos;s name"
                            className="input input-bordered w-full max-w-xs"
                            name='motherName'
                            required
                        />
                        <input
                            type="text"
                            placeholder="Class"
                            className="input input-bordered w-full max-w-xs"
                            name='class'
                            required
                        />
                    </div>
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder="Roll number"
                            className="input input-bordered w-full max-w-xs"
                            name='rollNo'
                            required
                        />
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            className="input input-bordered w-full max-w-xs"
                            name='dob'
                            required
                        />
                    </div>
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder="Mobile number"
                            className="input input-bordered w-full max-w-xs"
                            name='mobileNumber'
                            required
                        />
                        <input
                            type="text"
                            placeholder="Aadhar number"
                            className="input input-bordered w-full max-w-xs"
                            name='aadharNumber'
                            required
                        />
                    </div>
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder="Village"
                            className="input input-bordered w-full max-w-xs"
                            name='village'
                            required
                        />
                        <input
                            type="text"
                            placeholder="District"
                            defaultValue="Jehanabad"
                            className="input input-bordered w-full max-w-xs"
                            name='district'
                            required
                        />
                    </div>
                    <div className='flex gap-4'>
                        <input
                            type="number"
                            placeholder="Tuition fee"
                            className="input input-bordered w-full max-w-xs"
                            name='tuitionFee'
                            min="0"
                            max="1000000"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Transport fee"
                            className="input input-bordered w-full max-w-xs"
                            name='transportFee'
                            min="0"
                            max="1000000"
                            required
                        />
                    </div>
                    <div className='flex gap-4'>
                        <input
                            type="number"
                            placeholder="Due fee"
                            className="input input-bordered w-full max-w-xs"
                            name='otherFee'
                            min="0"
                            max="1000000"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Exam fee"
                            className="input input-bordered w-full max-w-xs"
                            name='examFee'
                            min="0"
                            max="1000000"
                            required
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Page Number"
                        className="input input-bordered w-full max-w-xs"
                        name='PageId'
                        required
                    />
                    <button className='btn w-full' type='submit'> Add student</button>
                </form>
            </div>
        </div>
    )
}

export default AddStudent