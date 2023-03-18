## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

React UI - Assignment
What to Use:
Required:
• Material UI / Bootstrap or both for the UI layout,
• Formik with relevant validations,
• Redux Toolkit (for state management / Crud operations)
• React 18
• Functional Component should be used with hooks
Optional:
• Less / sass
===================================
Routes:
User Listing
– Edit & Add
Role Listing
– Edit & Add
=========================================
User Listing:

- Create, Edit and Delete
  Note:  
  On Delete a Popup should be shown for confirmation before deleting
  Use Material Table or Data Grid

Add / Edit User Form:
User Data: {
name: ""
email:""
username: ""
mobile: ""
roleKey: "" (Select Dropdown - with options from Roles)
password: ""
}
Note:
Use the same component and handle new / update state based on params
On edit - password will be blank and user must type / enter new password every time.
=========================================
Role Listing

- Create, Edit and Delete
  Note:  
  On Delete a Popup should be shown for confirmation before deleting
  Use Material Table or Data Grid

Add / Edit Role:
roleData: {
roleLabel: “”
roleKey : “”
}

Note:
Use the same component and handle new / update state based on params
=========================================
UI Reference:
