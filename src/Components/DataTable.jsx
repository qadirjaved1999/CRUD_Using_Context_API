import React from 'react'
import { useMyContext } from '../MyStore/UseMyContext'

const DataTable = () => {
    const {num, age} = useMyContext()
  return (
    <div>My Name is {num} and I am {age} years Old</div>
  )
}

export default DataTable