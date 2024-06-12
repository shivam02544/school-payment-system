"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
const HeaderAfterLogin = ({ className }) => {
    const [dues, setDues] = useState();
    const [playedBill, setPayedBill] = useState()
    useEffect(() => {
        const fetchDues = async () => {
            const response = await fetch('/api/calculateTotalDue');
            const data = await response.json();
            setDues(data.totalFee);
            setPayedBill(data.totalPayed)
        };
        fetchDues();
    }, []);
    return (
        <div className={`navbar bg-gray-200 flex px-6 shadow-md justify-between z-20 sticky top-0 ${className}`}>
            <Link href="/home">
                <div className='flex items-center gap-4'>
                    <img className='size-12 rounded-xl ' src="https://i0.wp.com/bp0.blogger.com/_P_w_L9olMuI/R8MBebvyyYI/AAAAAAAAABU/hFvBndfSKqY/s320/Pratik.jpg" alt="logo" />
                    <h1 className='font-extrabold text-orange-600 text-2xl'>New Progressive Public School</h1>
                </div>
            </Link>
            <div >
                <span className='font-bold border-r-2 border-gray-500 pr-4'>Dues: <span className='text-green-600 ml-1 text-lg font-extrabold'>₹{dues}</span></span>
                <span className='font-bold pl-4'>Current month: <span className='text-green-600 ml-1 text-lg font-extrabold'>₹{playedBill}</span></span>

            </div>
            <div className='gap-4'>
                <button className='text-orange-600 font-bold text-lg active:text-orange-400'><Link href="/billPayment">Pay bill</Link></button>
                <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className=" btn text-orange-600 font-bold text-lg">Menu</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href="/addStudent">Add new student</Link></li>
                        <li><Link href="/students">Search student</Link></li>
                        <li><Link href="#">Search student bill</Link></li>
                        <li><Link href="/monthBill">Print Monthly bill</Link></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default HeaderAfterLogin