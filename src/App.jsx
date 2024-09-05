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
  const [data, setData] = useState(null);
  // Data Fetched from Local Storage
  useEffect(() => {
    // setInputValue(initialInputValue);
    const usersdata = JSON.parse(localStorage.getItem("data"));
    if (usersdata && usersdata.length > 0) {
      setData(usersdata)
    } else {
      console("Data not found 404");
    }
  }, [])
  return (
    <MyProvider value={{ inputValue, setInputValue, initialInputValue, users, setUsers, data, setData }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />}/>
          <Route path='/users/data' element={<DataTable />}/>
        </Routes>
      </BrowserRouter>
    </MyProvider>
  )
}

export default App
