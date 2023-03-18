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
import { deleteRole } from "../../reducer/roleSlice";
import ConfirmDialog from "../../components/ConfirmDialog";

export const RolesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, showOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleDeleteRole = (event, cellValues) => {
    event.stopPropagation();
    setDeleteId(cellValues.id);
    showOpenDialog(true);
  };

  const handleCloseDialog = () => {
    console.log("close");
    showOpenDialog(false);
  };

  const handleAcceptDialog = () => {
    dispatch(deleteRole({ id: deleteId }));
    showOpenDialog(false);
  };

  const roles = useSelector((store) => store.roles);
  const columns = [
    { field: "id", headerName: "Id", width: 130 },
    { field: "roleLabel", headerName: "Role", width: 200 },
    {
      field: "Action",
      headerName: "Action",
      width: 230,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/roleEdit/${cellValues.id}`);
              }}
            >
              <ModeEditOutlineIcon />
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              variant="contained"
              color="error"
              onClick={(event) => {
                handleDeleteRole(event, cellValues);
              }}
            >
              <DeleteForeverIcon />
            </Button>
          </>
        );
      },
    },
  ];
  console.log(roles);

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
              Roles
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
                navigate("/roleAdd");
              }}
            >
              Add New Role
            </Button>
          </div>
          <DataGrid
            rows={roles}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Box>
    </>
  );
};
