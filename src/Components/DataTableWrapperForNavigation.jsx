import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { useMyContext } from '../MyStore/UseMyContext'
import DataTable from './DataTable'


const DataTableWrapperForNavigation = () => {
    // const navigate = useNavigate()
    const {updateUsers, users} = useMyContext();

    const handleEditUser = (id) => {
        updateUsers(id); 
        navigate(`/users/data/${id}`);
      };
  return (
    <DataTable users={users} onEditUser={handleEditUser}/>
  )
}

export default DataTableWrapperForNavigation