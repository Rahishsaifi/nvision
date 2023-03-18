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
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../../reducer/userSlice";
import { useParams } from "react-router-dom";
import { initialUserState } from "../../constants/index";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const UserAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const users = useSelector((store) => store.users);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialState, setInitialState] = useState(initialUserState);

  const roles = useSelector((store) => store.roles);

  useEffect(() => {
    if (params.id) {
      setIsEditMode(true);
      const editUser = users.filter((user) => user.id == params.id);
      setInitialState({
        id: editUser[0].id,
        name: editUser[0].name,
        email: editUser[0].email,
        userName: editUser[0].userName,
        password: "",
        roleKey: editUser[0].roleKey,
        mobile: editUser[0].mobile,
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
              Users
            </Typography>
          </div>
          <Grid>
            <Card
              style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {isEditMode ? "Edit This User" : "Add New User"}
                </Typography>
              </CardContent>
              <Formik
                initialValues={initialState}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }

                  if (!values.name) {
                    errors.name = "Please Enter Name";
                  }

                  if (!values.userName) {
                    errors.userName = "Please Enter User Name";
                  }

                  if (!values.mobile) {
                    errors.mobile = "Please Enter Mobile";
                  }

                  if (!values.password) {
                    errors.password = "Please Enter Password";
                  }

                  if (!values.roleKey) {
                    errors.roleKey = "Please Select Role";
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    if (isEditMode) {
                      dispatch(editUser(values));
                    } else {
                      values.id = uuidv4();
                      dispatch(addUser(values));
                    }
                    navigate("/");
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
                          name="name"
                          label="Name"
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          placeholder="Enter Name"
                          fullWidth
                        />
                        {errors.name && touched.name && errors.name}
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          label="Email"
                          variant="outlined"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="number"
                          placeholder="Enter Mobile number"
                          label="Mobile"
                          variant="outlined"
                          name="mobile"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mobile}
                        />
                        {errors.mobile && touched.mobile && errors.mobile}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          placeholder="Enter User name"
                          label="User Name"
                          variant="outlined"
                          name="userName"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.userName}
                        />
                        {errors.userName && touched.userName && errors.userName}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="password"
                          placeholder="Enter Password"
                          label="Password"
                          variant="outlined"
                          name="password"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                      </Grid>
                      <Grid item xs={12}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.roleKey}
                          label="Role"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ width: "100%" }}
                          displayEmpty
                          defaultValue={""}
                          name="roleKey"
                        >
                          <MenuItem value="" disabled>
                            <em>select the value</em>
                          </MenuItem>
                          {roles.map((role) => (
                            <MenuItem
                              key={role.roleKey}
                              value={role.roleKey}
                              selected
                            >
                              {role.roleLabel}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.roleKey && touched.roleKey && errors.roleKey}
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={isSubmitting}
                        >
                          {isEditMode ? "Update User" : "Add User"}
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
