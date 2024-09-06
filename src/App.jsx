import React, { useEffect, useState } from 'react'
import './App.css'
import { MyProvider } from './MyStore/UseMyContext';
import DataTable from './Components/DataTable';
import Form from './Components/Form';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
  const [users, setUsers] = useState([])
  // Data Fetched from Local Storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    if (storedData && storedData.length > 0) {
      setUsers(storedData);
    } else {
      console.log("Data not found 404");
    }
  }, [setUsers]);
  // Functionality
  const updateUsers = (id) => {
    console.log("App-------------", id);
  }
  const deleteUsers = (id) => {
    setUsers((prev) => {
      const deletedUser = prev.filter((_, user) => user + 1 !== id);
      localStorage.setItem("data", JSON.stringify(deletedUser));

      return deletedUser
    })
  }
  return (
    <MyProvider value={{ inputValue, setInputValue, initialInputValue, users, setUsers, updateUsers, deleteUsers }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/users/data' element={<DataTable />} />
        </Routes>
      </BrowserRouter>
    </MyProvider>
  )
}

export default App
