import * as React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routesExamples } from "./examples/routes.jsx";
import { routesScratch } from "./scratch/routes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: routesExamples,
  },
  ...routesScratch,
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
