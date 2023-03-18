import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
      id: "9a674ff3-899e-4f65-b40a-d054b59b111E",
      roleLabel: "Admin",
      roleKey : "admin",
    },
    {
    id: "9a674ff3-899e-4f65-b40a-d054b59b111F",
    roleLabel: "Manager",
    roleKey : "manager",
    },
    {
    id: "9a674ff3-899e-4f65-b40a-d054b59b111G",
    roleLabel: "Accountant",
    roleKey : "accountant",
    },
  ];

  const roleSlice = createSlice({
    name:"roles",
    initialState,
    reducers : {
        addRole : (state,action) =>{
            state.push(action.payload);
        },
        editRole : (state,action) =>{
            const {id,roleLabel,roleKey} = action.payload;
            const existingRole = state.find(role => role.id === id);
            if(existingRole){
                existingRole.roleLabel = roleLabel;
                existingRole.roleKey =roleKey;
            }
        },
        deleteRole : (state,action) =>{
            const {id} = action.payload;
            const existingRole = state.find(role => role.id == id);
            if(existingRole){
                return state.filter(role => role.id != id);
            }
        }
    }

  })

  export const {addRole ,editRole ,deleteRole} = roleSlice.actions;
  export default roleSlice.reducer;