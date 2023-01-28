 

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DashboardPage } from "./views";
import { RegisterPage,LoginPage,ResetPasswordPage } from "./views/auth";
import 'boxicons'
import './assets/styles/app.scss'
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage/>,

  },{
    path: "/register",
    element:<RegisterPage/>
  },
  {
    path:"/login",
    element:<LoginPage/>
  },
  {
    path:"/resetpassword",
    element:<ResetPasswordPage/>
  }
]);
export default function Router() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
