import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useRouter } from "next/navigation";

const columns: GridColDef[] = [
  {
    field: "thumbnail",
    headerName: "Зураг",
    width: 150,
    renderCell: (params) => <Image width={100} height={100} src={params.value} alt="Upload" />,
    sortable: false,
    filterable: false,
  },
  { field: "title", headerName: "Нэр", width: 200, sortable: false },
  {
    field: "Category",
    headerName: "Төрөл",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <div className="flex justify-center items-center h-[50px]">
        <div className="rounded-full bg-[#808080] w-[60px] h-[25px] flex justify-center items-center text-xs">
          {params?.value.toUpperCase()}
        </div>
      </div>
    ),
  },
  {
    field: "link",
    headerName: "Холбоос",
    width: 450,
    sortable: false,
    renderCell: (params) => (
      <a target="_blan" href={params?.value}>
        {" "}
        {params?.value}
      </a>
    ),
  },
  {
    field: "Highlight",
    headerName: "Онцлох",
    width: 200,
    sortable: false,
    renderCell: (params) => (
      <div className="flex justify-center items-center h-[50px]">
        <div
          style={{
            backgroundColor: params?.value ? "#53BD90" : "#3A88C0",
          }}
          className={`rounded-full w-[60px] h-[25px] flex justify-center items-center text-xs  `}
        >
          {params?.value ? "Онцлох" : "Энгийн"}
        </div>
      </div>
    ),
  },
  { field: "createdAt", headerName: "ОГНОО", valueGetter: (value: any, row) => value?.split("T")[0], sortable: false },
];

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable({ rows }) {
  const router = useRouter();

  const handleRowClick = (params) => {
    router.push(`/backoffice/${params.row._id}`); // Navigate to the detail page
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        onRowClick={(row) => handleRowClick(row)}
      />
    </Paper>
  );
}
