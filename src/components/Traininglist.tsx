import { useEffect, useState } from "react";
import type { Training } from "../types/training";
import { getTrainingsWithCustomer, deleteTraining } from "../api/trainingApi";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import dayjs from "dayjs";

function Traininglist() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => fetchTrainings(), []);  // empty dependency array ( run once on mount)

  // get all trainings with customer data (/gettrainings endpoint)
  const fetchTrainings = () => {
    getTrainingsWithCustomer()
      .then(data => {
        setTrainings(data);
      })
      .catch(err => console.error(err));
  };

  // handle deleting a training
  const handleDelete = (id: number) => {
    if (window.confirm("Do you want to delete this training?")) {
    // /gettrainings returns number id, not _link.self.href like /customers, so deletion done with id (/trainings/{id} endpoint)
      const url = `${import.meta.env.VITE_API_URL}/trainings/${id}`;
      deleteTraining(url)
        .then(() => fetchTrainings())  // refresh list after deletion
        .catch(err => console.error(err));
    }
  };

  // column definitions for trainings table
  const columns: GridColDef[] = [
    { field: "activity", headerName: "Activity", width: 200 },
    { field: "date", headerName: "Date", width: 200, 
  // value formatter and dayjs to format date 
    valueFormatter: (value: Date) =>
    dayjs(value).format("DD.MM.YYYY HH:mm")},
    
    { field: "duration", headerName: "Duration (min)", width: 150 },
    {
      field: "customerName",
      headerName: "Customer",
      width: 200,
      valueGetter: (_value, row) => { 
          return row.customer.firstname + " " + row.customer.lastname;
      },
    },

    // delete button column
    {
      headerName: "",
      sortable: false,
      filterable: false,
      field: "actions",
      renderCell: (params: GridRenderCellParams) => 
        <Button
          color="error"
          size="small"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
    }
  ];

  return (
    <div style={{ width: "60%", height: 500 }}>
      <DataGrid
        rows={trainings}
        columns={columns}
        getRowId={row => row.id}
        autoPageSize
        rowSelection={false}
      />
    </div>
  );
}

export default Traininglist;