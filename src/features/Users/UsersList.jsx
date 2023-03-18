import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SideNav from "../../components/SideNav";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../reducer/userSlice";
import ConfirmDialog from "../../components/ConfirmDialog";

export const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, showOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleDeleteUser = (event, cellValues) => {
    event.stopPropagation();
    console.log(cellValues);
    setDeleteId(cellValues.id);
    //  dispatch(deleteUser({ id: cellValues.id }));
    showOpenDialog(true);
  };

  const handleCloseDialog = () => {
    console.log("close");
    showOpenDialog(false);
  };

  const handleAcceptDialog = () => {
    dispatch(deleteUser({ id: deleteId }));
    showOpenDialog(false);
  };

  const users = useSelector((store) => store.users);
  const columns = [
    { field: "id", headerName: "Id", width: 130 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "userName", headerName: "User Name", width: 130 },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 130,
    },
    {
      field: "roleKey",
      headerName: "Role",
    },
    {
      field: "Action",
      headerName: "Action",
      type: "number",
      width: 230,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`userEdit/${cellValues.id}`);
              }}
            >
              <ModeEditOutlineIcon />
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              variant="contained"
              color="error"
              onClick={(event) => {
                handleDeleteUser(event, cellValues);
              }}
            >
              <DeleteForeverIcon />
            </Button>
          </>
        );
      },
    },
  ];
  console.log(users);

  return (
    <>
      <ConfirmDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleAcceptDialog={handleAcceptDialog}
      />
      <Box sx={{ display: "flex" }}>
        <SideNav />

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Typography variant="h5" component="h2">
              {" "}
              Users{" "}
            </Typography>
            ;
            <Button
              style={{
                marginLeft: "10px",
                justifyContent: "end",
                alignItems: "end",
              }}
              variant="contained"
              color="warning"
              onClick={() => {
                navigate("/userAdd");
              }}
            >
              Add User
            </Button>
          </div>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Box>
    </>
  );
};
