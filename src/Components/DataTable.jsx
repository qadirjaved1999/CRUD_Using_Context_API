import React, { useMemo } from 'react';
import { useMyContext } from '../MyStore/UseMyContext';
import { MdEditCalendar, MdDeleteForever } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useTable, useGlobalFilter } from 'react-table'; // Import react-table hooks

// Default UI for global filtering
function GlobalFilter({
  globalFilter,
  setGlobalFilter,
}) {
  return (
    <input
      className="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg"
      value={globalFilter || ''}
      onChange={(e) => {
        setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder="Search user name..."
    />
  );
}

const DataTable = ({ onEditUser }) => {
  const { users, updateUsers, deleteUsers, setInputValue, initialInputValue } = useMyContext();
  const navigateToAddUser = useNavigate();
  
  const addNewUser = () => {
    navigateToAddUser('/users/form');
    setInputValue(initialInputValue);

  };
  // Define columns for react-table
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: (_, index) => index, // Since your data doesn't have an id field
        disableFilters: true, // Disable filtering on this column
      },
      {
        Header: 'First Name',
        accessor: 'fname',
      },
      {
        Header: 'Last Name',
        accessor: 'lname',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Password',
        accessor: 'password',
        disableFilters: true, // Disable filtering on this column
      },
      {
        Header: 'Contact Number',
        accessor: 'contact',
        disableFilters: true, // Disable filtering on this column
      },
      {
        Header: 'Gender',
        accessor: 'gender',
        disableFilters: true, // Disable filtering on this column
      },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <div className="flex justify-center items-center">
            {console.log("this id pass in URL from table =>",row.original.id)}
            <Link to={`/users/form/${row.original.id}`}>
              <button
                onClick={() => onEditUser(row.original.id)}
                type="button"
                className="flex items-center text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-4 py-2 mr-2"
              >
                Edit <MdEditCalendar className="ml-1 text-xl" />
              </button>
            </Link>
            <button
              onClick={() => deleteUsers(row.original.id)}
              type="button"
              className="flex items-center text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2"
            >
              Delete <MdDeleteForever className="ml-1 text-xl" />
            </button>
          </div>
        ),
        disableFilters: true, // Disable filtering on the Action column
      },
    ],
    [updateUsers, deleteUsers]
  );

  // Use the useTable and useGlobalFilter hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: users,
      defaultColumn: { Filter: null }, // Disable individual filters
      globalFilter: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const firstName = row.original.fname?.toLowerCase() || '';
          const lastName = row.original.lname?.toLowerCase() || '';
          const email = row.original.email?.toLowerCase() || '';
          const searchValue = filterValue.toLowerCase();
          return (
            firstName.includes(searchValue) ||
            lastName.includes(searchValue) ||
            email.includes(searchValue)
          );
        });
      },
    },
    useGlobalFilter // Enable global filtering
  );
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 pt-10 pb-10 text-center">
        My Users Data Table
      </h1>
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="w-1/3">
          {/* Global Search */}
          <GlobalFilter
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
        <button
          onClick={addNewUser}
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Add New User
        </button>
      </div>
      <table
        {...getTableProps()}
        className="w-full text-sm text-left text-gray-500"
      >
        <thead className="text-xs text-white uppercase bg-black text-center">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length > 0 ? (
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-white border-b text-center"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
