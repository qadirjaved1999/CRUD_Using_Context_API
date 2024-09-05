import React  from 'react'
import './App.css'
import { MyProvider } from './MyStore/UseMyContext';
import DataTable from './Components/DataTable';
import Form from './Components/Form';

function App() {
  const num = "Qadir";
  const age = 25;

  return (
    <MyProvider value={{num, age}}>
      <Form />
      <DataTable />
    </MyProvider>
  )
}

export default App
