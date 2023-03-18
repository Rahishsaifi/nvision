import reducer, { addUser, deleteUser } from "../../reducer/userSlice";

export const initialUserState = {
  id: "9a674ff3-899e-4f65-b40a-d054b59b111c",
  name: "Rahish",
  email: "rahishsaifi46@gmail.com",
  userName: "rahish",
  password: "123456",
  roleKey: "admin",
  mobile: "9910735867",
};

test("should handle a user being added", () => {
  const previousState = [];
  expect(reducer(previousState, addUser(initialUserState))).toEqual([
    {
      id: "9a674ff3-899e-4f65-b40a-d054b59b111c",
      name: "Rahish",
      email: "rahishsaifi46@gmail.com",
      userName: "rahish",
      password: "123456",
      roleKey: "admin",
      mobile: "9910735867",
    },
  ]);
});

test("should handle delete user", () => {
  const previousState = [
    {
      id: "9a674ff3-899e-4f65-b40a-d054b59b111c",
      name: "Rahish",
      email: "rahishsaifi46@gmail.com",
      userName: "rahish",
      password: "123456",
      roleKey: "admin",
      mobile: "9910735867",
    },
  ];
  expect(
    reducer(
      previousState,
      deleteUser({ id: "9a674ff3-899e-4f65-b40a-d054b59b111c" })
    )
  ).toEqual([]);
});
