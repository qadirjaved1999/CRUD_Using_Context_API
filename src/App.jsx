import React, { useEffect, useState } from 'react'
import './App.css'
import { MyProvider } from './MyStore/UseMyContext';
import Form from './Components/Form';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DataTableWrapperForNavigation from './Components/DataTableWrapperForNavigation';

function App() {
  const initialInputValue = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    contact: "",
    gender: ""
  };
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [users, setUsers] = useState([]);
  // Data Fetched from Local Storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    if (storedData && storedData.length > 0) {
      setUsers(storedData);
    } else {
      console.log("Data not found 404");
    }
  }, []);
  // Functionality
  const updateUsers = (id) => {
    console.log("id a rahi ha updateUsers ma =>", id)
    const userToEdit = users.find((user) => user.id === id);
    console.log("find clickable user =>", userToEdit)
    if (userToEdit) {
      setInputValue(userToEdit);
    }
    console.log("Editing User and set value in input => ", userToEdit);
  }
  const deleteUsers = (id) => {
    console.log("user Delete => ", id)
    setUsers((prev) => {
      const deletedUser = prev.filter((user) => user.id !== id);
      localStorage.setItem("data", JSON.stringify(deletedUser));
      // const deletedUser = prev.filter((_, user) => user + 1 !== id); //prev.filter((userObj, index) => index + 1 !== id);

      return deletedUser
    })
  }
  return (
    <MyProvider value={{ inputValue, setInputValue, initialInputValue, users, setUsers, updateUsers, deleteUsers }}>
      <BrowserRouter>
        <Routes>
          <Route path='/users/form' element={<Form />} />
          <Route path='/users/form/:id' element={<Form />} />
          <Route path='/users/data' element={< DataTableWrapperForNavigation />} />
        </Routes>
      </BrowserRouter>
    </MyProvider>
  )
}

export default App
