import { configureStore } from '@reduxjs/toolkit';
import usersReducer  from '../reducer/userSlice';
import rolesReducer from '../reducer/roleSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    roles : rolesReducer
  },
})
