import { Routes, Route } from "react-router-dom";
import { UsersList } from "./features/Users/UsersList";
import { UserAdd } from "./features/Users/UserAdd";
import { RolesList } from "./features/Roles/RolesList";
import { RoleAdd } from "./features/Roles/RoleAdd";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<UsersList />}></Route>
        <Route path="/userAdd" exact element={<UserAdd />}></Route>
        <Route path="/roles" exact element={<RolesList />}></Route>
        <Route path="/roleAdd" exact element={<RoleAdd />}></Route>
        <Route path="/userEdit/:id" exact element={<UserAdd />}></Route>
        <Route path="/roleEdit/:id" exact element={<RoleAdd />}></Route>
      </Routes>
    </>
  );
}

export default App;
