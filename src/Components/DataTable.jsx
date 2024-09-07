import React from 'react'
import { useMyContext } from '../MyStore/UseMyContext'
import { MdEditCalendar } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const DataTable = () => {
    const { users, updateUsers, deleteUsers } = useMyContext();
    const navigateToAddUser = useNavigate();
    const addNewUser = () => {
        navigateToAddUser('/');
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-200">
            <div className="flex justify-end items-end">
                <div className="flex text-right">
                    <h1 className="mr-[400px] text-2xl font-bold text-gray-800 pt-10 pb-10">My Users Data Table</h1>
                    <button onClick={addNewUser} className="flex justify-center items-center bg-green-400 text-white font-bold h-10 mt-10 mr-5 p-5 rounded text-center">Add New Users</button>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-black text-center">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            First Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Password
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Contact Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Gender
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-center">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.fname}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.lname}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.email}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.password}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.contact}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.gender}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    <div className='flex justify-center items-center text-center'>
                                        <button  onClick={() => updateUsers(index + 1)} type="button" className="flex justify-center items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit <MdEditCalendar className="ml-1 text-xl"/></button>
                                        <button  onClick={() => deleteUsers(index + 1)} type="button" className="flex justify-center items-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete <MdDeleteForever className="ml-1 text-xl" /></button>
                                    </div>
                                </th>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>

    )
}

export default DataTable