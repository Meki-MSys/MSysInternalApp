//Component import
import Dashboard from "./components/Dashboard";
import FormPage from "./components/FormPage";
import EmployeeList from "./components/EmployeeList";
//import Login from "./components/auth/Login";
import LoginPage from "./components/auth/LoginPage";

const routes = [
  { path: "/", exact: true, name: "Login", element: LoginPage },
  { path: "/dashboard", name: "Dashboard", exact: true, element: Dashboard },
  {
    path: "/formpage",
    name: "Form Page",
    exact: true,
    element: FormPage,
  },
  {
    path: "/employee-details",
    name: "Employee Details",
    exact: true,
    element: EmployeeList,
  },
];

export default routes;
