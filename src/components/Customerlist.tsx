import { useEffect, useState } from "react";
import type { Customer } from "../types/customer";
import { getCustomers, deleteCustomer } from "../api/customerApi";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import { getTrainings } from "../api/trainingApi";

// MUI components
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

function Customerlist() {

// state to hold customers fetched from API
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => fetchCustomers(), []); // empty dependency array ( run once on mount)

  // function to fetch customers from API and set state
  const fetchCustomers = () => {
    getCustomers()    // from api/customerApi
      .then(data => setCustomers(data._embedded.customers)) // set state with fetched customers so they can be displayed
      .catch(err => console.error(err)); 
  };

  // function to handle deleting a customer
  const handleDelete = (url: string) => {
    if (window.confirm("Do you want to delete customer and associated trainings?")) {
     // Call delete from /api/customerApi and refresh list after deletion
      deleteCustomer(url)
      .then(() => fetchCustomers())
      .catch(err => console.error(err));
    }
  };

  // column definitions for DataGrid table with customers
  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First Name", width: 150 },
    { field: "lastname", headerName: "Last Name", width: 150 },
    { field: "streetaddress", headerName: "Street Address", width: 200 },
    { field: "postcode", headerName: "Postcode", width: 100 },
    { field: "city", headerName: "City", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
        // column for delete button
      headerName: "",
      sortable: false,
      filterable: false,
      field: "_links.self.href",
      renderCell: (params: GridRenderCellParams) => 
        <Button
          color="error"
          size="small"
          onClick={() => handleDelete(params.id as string)}
        >
          <DeleteIcon />
        </Button>
    },

// edit customer column  
{
  headerName: "",
  sortable: false,
  filterable: false,
  field: "_links.customer.href",
  renderCell: (params: GridRenderCellParams) =>
      <EditCustomer
          fetchCustomers={fetchCustomers}
          customerRow={params.row}
      />
},
{
    headerName: "",
    sortable: false,
    filterable: false,
    field: "addTraining",
     width: 180,
    renderCell: (params: GridRenderCellParams) => 
    <AddTraining 
        fetchTrainings={getTrainings} 
        customerUrl={params.row._links.self.href} 
    />
}
  ];
  return (
    <div style={{ width: "90%", height: 500}}>
      {/* renders table of customers as defined above */}
      {/* load 'add customer' button (component) before datagrid */}
      <AddCustomer fetchCustomers={fetchCustomers} />
      <DataGrid
        rows={customers}  // populate rows with customers from state
        columns={columns} // use columns defined above
        getRowId={row => row._links.self.href} // unique row id from HAL self link
        autoPageSize    // automatically adjust page size based on container
        rowSelection={false} // disable row selection. could be enabled for more features?
      />
    </div>
  );
}

export default Customerlist;
