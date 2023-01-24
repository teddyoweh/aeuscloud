 

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DashboardPage } from "./views";
import 'boxicons'
import './assets/styles/app.scss'
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage/>,
  },
]);
export default function Router() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
