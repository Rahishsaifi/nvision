import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
      id: "9a674ff3-899e-4f65-b40a-d054b59b111c",
      name: "Rahish",
      email: "Rahishsaifi46@gmail.com",
      userName: "rahish",
      mobile: "9910735867",
      roleKey: "Admin",
    },
    {
        id: "9a674ff3-899e-4f65-b40a-d054b59b111D",
        name: "Humera",
        email: "humera@gmail.com",
        userName: "humera",
        mobile: "9910735865",
        roleKey: "Manager",
      },
      {
        id: "9a674ff3-899e-4f65-b40a-d054b59b111E",
        name: "Pankaj",
        email: "Pankaj@gmail.com",
        userName: "Pankaj",
        mobile: "9910735866",
        roleKey: "Pankaj",
      },
  ];

  const userSlice = createSlice({
    name:"users",
    initialState,
    reducers : {
        addUser : (state,action) =>{
            console.log(action);
            state.push(action.payload);
        },
        editUser : (state,action) =>{
            const {id,name,email,userName,mobile,roleKey ,password} = action.payload;
            const existingUser = state.find(user => user.id == id);
            if(existingUser){
                existingUser.name = name;
                existingUser.email =email;
                existingUser.userName =userName;
                existingUser.mobile =mobile;
                existingUser.roleKey =roleKey;
                existingUser.password =password;
            }
        },
        deleteUser : (state,action) =>{
            const {id} = action.payload;
            const existingUser = state.find(user => user.id == id);
            if(existingUser){
                return state.filter(user => user.id !== id);
            }
          
        }
    }

  })

  export const {addUser ,editUser ,deleteUser} = userSlice.actions;
  export default userSlice.reducer;