import reducer, { addRole, deleteRole } from "../../reducer/roleSlice";

export const initialRoleState = {
  id: "9a674ff3-899e-4f65-b40a-d054b59b111c",
  roleLabel: "Admin",
  roleKey: "admin",
};

test("should handle a Role is added", () => {
  const previousState = [];
  expect(reducer(previousState, addRole(initialRoleState))).toEqual([
    {
      id: "9a674ff3-899e-4f65-b40a-d054b59b111c",
      roleLabel: "Admin",
      roleKey: "admin",
    },
  ]);
});

test("should handle delete Role", () => {
  const previousState = [
    {
      id: "9a674ff3-899e-4f65-b40a-d054b59b111c",
      roleLabel: "Admin",
      roleKey: "admin",
    },
  ];
  expect(
    reducer(
      previousState,
      deleteRole({ id: "9a674ff3-899e-4f65-b40a-d054b59b111c" })
    )
  ).toEqual([]);
});
