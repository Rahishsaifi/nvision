import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SideNav from "../../components/SideNav";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useDispatch, useSelector } from "react-redux";
import { addRole, editRole } from "../../reducer/roleSlice";
import { useParams } from "react-router-dom";
import { initialRoleState } from "../../constants/index";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const RoleAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const roles = useSelector((store) => store.roles);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialState, setInitialState] = useState(initialRoleState);
  useEffect(() => {
    if (params.id) {
      setIsEditMode(true);
      const editRole = roles.filter((role) => role.id == params.id);
      setInitialState({
        id: editRole[0].id,
        roleLabel: editRole[0].roleLabel,
        roleKey: editRole[0].roleKey,
      });
    }
  }, [params]);

  return (
    <>
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
              Role
            </Typography>
          </div>
          <Grid>
            <Card
              style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {isEditMode ? "Edit This Role" : "Add New Role"}
                </Typography>
              </CardContent>
              <Formik
                initialValues={initialState}
                validate={(values) => {
                  const errors = {};
                  if (!values.roleLabel) {
                    errors.roleLabel = "Please Enter Role";
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    if (isEditMode) {
                      dispatch(editRole(values));
                    } else {
                      values.id = uuidv4();
                      dispatch(addRole(values));
                    }
                    navigate("/roles");
                    setSubmitting(false);
                  }, 400);
                }}
                enableReinitialize
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid xs={12} sm={12} item>
                        <TextField
                          name="roleLabel"
                          label="Role"
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.roleLabel}
                          placeholder="Enter Name"
                          fullWidth
                        />
                        {errors.roleLabel &&
                          touched.roleLabel &&
                          errors.roleLabel}
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={isSubmitting}
                        >
                          {isEditMode ? "Update Role" : "Add Role"}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Card>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
