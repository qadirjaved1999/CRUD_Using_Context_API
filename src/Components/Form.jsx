import React from 'react'
import { useMyContext } from '../MyStore/UseMyContext'
import { useNavigate, useParams } from 'react-router-dom';

const Form = () => {
    const { inputValue, setInputValue, initialInputValue, users, setUsers } = useMyContext();
    const navigate = useNavigate();
    const { id } = useParams();
    console.log("if you can pass id from table then (useParams) show in form = ", id);

    // useEffect(() => {
    //     if (id) {
    //         const userToEdit = users[id];
    //         if (userToEdit) {
    //             setInputValue(userToEdit);
    //         }
    //     }
    // }, [id])
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue, [name]: value
        })
    }
    const saveFormData = (e) => {
        e.preventDefault();

        if (id) {
            const updatedUsers = users.map((user) => user.id === parseInt(id) ? inputValue : user);
            setUsers(updatedUsers);
            localStorage.setItem("data", JSON.stringify(updatedUsers));
            navigate('/users/data')
        } else {
             const addIdWithUser = {
                ...inputValue, id: users.length > 0 ? users[users.length - 1].id + 1 : 1
            }
            console.log("Checked id create or not when add new user =>",addIdWithUser)
            setUsers((prevUsers) => {
              const updatedUsers = [...prevUsers, addIdWithUser];
              localStorage.setItem("data", JSON.stringify(updatedUsers));

              return updatedUsers;

            });

            setInputValue(initialInputValue);
            navigate('/users/data')
        }
        

    }
    return (
        <div className='bg-green-400 p-[100px]'>
            <h1 className='pb-[50px] text-center'>My Users Data Form</h1>
            <form onSubmit={saveFormData}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter First Name" required name='fname' value={inputValue.fname} onChange={inputHandler} />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                        <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Last Name" required name='lname' value={inputValue.lname} onChange={inputHandler} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required name='email' value={inputValue.email} onChange={inputHandler} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Password" required name='password' value={inputValue.password} onChange={inputHandler} />
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                    <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Cell Number" required name='contact' value={inputValue.contact} onChange={inputHandler} />
                </div>
                <div>
                    <label htmlFor="gender" className="block mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                    <div className="flex items-center mb-4">
                        <input id="male" type="radio" value="male" name="gender" checked={inputValue.gender === "male"} onChange={inputHandler} className="w-4 h-4 bg-gray-100 border-gray-300] dark:border-gray-600" />
                        <label htmlFor="male" className="ms-2 text-sm font-medium text-white">Male</label>
                    </div>
                    <div className="flex items-center">
                        <input id="female" type="radio" value="female" name="gender" checked={inputValue.gender === "female"} onChange={inputHandler} className="w-4 h-4 bg-gray-100 border-gray-300 dark:border-gray-600" />
                        <label htmlFor="female" className="ms-2 text-sm font-medium text-white">Female</label>
                    </div>
                </div>
                <div className="flex items-start mb-6 mt-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-white">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>


    )
}

export default Form