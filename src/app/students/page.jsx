"use client"
import HeaderAfterLogin from "@/components/HeaderAfterLogin";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Students = () => {
  const apiUrl = process.env.API_URL || '';
  const [studentData, setStudentData] = useState([]);
  const [showData, setShowData] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    try {
      const queryParams = new URLSearchParams(formObject).toString();
      const res = await fetch(`${apiUrl}/api/studentData?${queryParams}`)
      const data = await res.json();
      if (data.name) {
        toast.error("Student is not available")
        setShowData(false);
      }
      else {
        setStudentData(data)
        setShowData(true)

      }
    } catch (error) {
      console.log(error);
    }

  }
  const getAllStudentData = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/studentData?$option=0&search=all`)
      const data = await res.json();
      if (data.name) {
        toast.error("Student is not available")
        setShowData(false);
      }
      else {
        setStudentData(data)
        setShowData(true)
      }
    } catch (error) {
      console.log(error);
    }
  }
  function currentStudentDialogBox(index) {
    setCurrentStudent(studentData[index])
    document.getElementById('my_modal_1').showModal()
  }
  async function editStudent(e) {
    e.preventDefault();
    const { _id, ...student } = currentStudent;
    try {
      const res = await fetch(`${apiUrl}/api/studentData?id=${currentStudent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      })
      const data = await res.json();
      toast.success(data.msg)
      document.getElementById('my_modal_1').close()
      getAllStudentData()
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteStudent(index) {
    const res = await fetch(`${apiUrl}/api/studentData?id=${studentData[index]._id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    toast.success(data.msg)
    getAllStudentData()
  }
  return (
    <div>
      <HeaderAfterLogin />
      <div className="z-10 sticky top-20 bg-white">
        <h1 className="text-center mt-2 font font-extrabold text-2xl bg-orange-600 text-white ">Student dashboard</h1>
        <div className="my-4 flex items-center justify-center shadow-sm h-20">
          <span className="text-lg font-bold my-2">Search student by ▶ </span>
          <form onSubmit={(e) => handleSubmit(e)} className="flex">
            <select className="select select-bordered " name="option">
              <option value="1" >Student name</option>
              <option value="2">Father&apos;s name</option>
              <option value="3">Village name</option>
              <option value="4">Class</option>
            </select>
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full max-w-xs ml-2 "
              name="search"
              required
            />
            <button className="btn font-bold text-lg ml-2 " type="submit">Search</button>
          </form>
          <button className="btn font-bold text-lg ml-2 bg-orange-600 text-white " onClick={getAllStudentData} >Show all student</button>
        </div>
      </div>
      <div className="mx-10 mt-7 flex justify-between flex-wrap">
        {!showData ? "" :
          studentData.map((student, index) => {
            return (
              <div className="flex justify-center flex-col m-6 bg-gray-50 w-[36rem]  p-6 rounded-md shadow-md " key={student._id} >
                <h1 className="font-extrabold text-xl text-orange-600">New progressive public school Nauroo, Jehanabad</h1>
                <span className="text-lg">Name: <b className="text-lg">{student.name}</b></span>
                <span>Class: {student.class}</span>
                <span>Roll no: {student.rollNo}</span>
                <span>Father&apos;s name: {student.fatherName}</span>
                <span>Mother&apos;s name: {student.motherName}</span>
                <span>Date of birth: {student.dob}</span>
                <span>Mobile number: {student.mobileNumber}</span>
                <span>Aadhar number: {student.aadharNumber}</span>
                <span>Village: {student.village}</span>
                <span>District: {student.district}</span>
                <span>Tuition fee: {student.tuitionFee}</span>
                <span>Transport fee: {student.transportFee}</span>
                <span>Due fee: {student.otherFee}</span>
                <span>Exam fee: {student.examFee}</span>
                <span>Page id: {student.pageId}</span>
                <div className="flex items-center justify-center gap-6 mt-2">
                  <button onClick={() => currentStudentDialogBox(index)} className="btn bg-orange-600 text-white">Edit</button>
                  <button onClick={() => deleteStudent(index)} className="btn bg-red-600 text-white">Delete</button>
                </div>
              </div>
            )
          })
        }
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h1 className='font-extrabold text-center my-2 text-2xl text-orange-600 '>Edit data your self</h1>
          {
            currentStudent && (
              <form
                onSubmit={(e) => editStudent(e)}
                className='space-y-4 text-orange-600'
              >
                <div className='flex gap-4'>
                  <input
                    type="text"
                    placeholder="Student name"
                    className="input input-bordered w-full max-w-xs"
                    name='name'
                    value={currentStudent.name}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Father&apos;s name"
                    className="input input-bordered w-full max-w-xs"
                    name='fatherName'
                    value={currentStudent.fatherName}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, fatherName: e.target.value })}
                    required
                  />
                </div>
                <div className='flex gap-4'>
                  <input
                    type="text"
                    placeholder="Mother&apos;s name"
                    className="input input-bordered w-full max-w-xs"
                    name='motherName'
                    value={currentStudent.motherName}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, motherName: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Class"
                    className="input input-bordered w-full max-w-xs"
                    name='class'
                    value={currentStudent.class}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, class: e.target.value })}
                    required
                  />
                </div>
                <div className='flex gap-4'>
                  <input
                    type="text"
                    placeholder="Roll number"
                    className="input input-bordered w-full max-w-xs"
                    name='rollNo'
                    value={currentStudent.rollNo}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, rollNo: e.target.value })}
                    required
                  />
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    className="input input-bordered w-full max-w-xs"
                    name='dob'
                    value={currentStudent.dob}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, dob: e.target.value })}
                    required
                  />
                </div>
                <div className='flex gap-4'>
                  <input
                    type="text"
                    placeholder="Mobile number"
                    className="input input-bordered w-full max-w-xs"
                    name='mobileNumber'
                    value={currentStudent.mobileNumber}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, mobileNumber: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Aadhar number"
                    className="input input-bordered w-full max-w-xs"
                    name='aadharNumber'
                    value={currentStudent.aadharNumber}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, aadharNumber: e.target.value })}
                    required
                  />
                </div>
                <div className='flex gap-4'>
                  <input
                    type="text"
                    placeholder="Village"
                    className="input input-bordered w-full max-w-xs"
                    name='village'
                    value={currentStudent.village}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, village: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="District"
                    defaultValue="Jehanabad"
                    className="input input-bordered w-full max-w-xs"
                    name='district'
                    value={currentStudent.district}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, district: e.target.value })}
                    required
                  />
                </div>
                <div className='flex gap-4'>
                  <input
                    type="number"
                    min='0'
                    max='100000'
                    placeholder="Tuition fee"
                    className="input input-bordered w-full max-w-xs"
                    name='tuitionFee'
                    value={currentStudent.tuitionFee}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, tuitionFee: e.target.value })}
                    required
                  />
                  <input
                    type="number"
                    min='0'
                    max='100000'
                    placeholder="Transport fee"
                    className="input input-bordered w-full max-w-xs"
                    name='transportFee'
                    value={currentStudent.transportFee}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, transportFee: e.target.value })}
                    required
                  />
                </div>
                <div className='flex gap-4'>
                  <input
                    type="number"
                    min='0'
                    max='100000'
                    placeholder="Due fee"
                    className="input input-bordered w-full max-w-xs"
                    name='otherFee'
                    value={currentStudent.otherFee}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, otherFee: e.target.value })}
                    required
                  />
                  <input
                    type="number"
                    min='0'
                    max='100000'
                    placeholder="Exam fee"
                    className="input input-bordered w-full max-w-xs"
                    name='examFee'
                    value={currentStudent.examFee}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, examFee: e.target.value })}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Page Number"
                  className="input input-bordered w-full max-w-xs"
                  name='PageId'
                  value={currentStudent.pageId}
                  onChange={(e) => setCurrentStudent({ ...currentStudent, pageId: e.target.value })}
                  required
                />
                <button className='btn w-full' type='submit'> Save</button>
              </form>
            )
          }
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div >
  );
};

export default Students;
