import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "./Routes/Routes";
import { AuthProvider } from "./Contexts/Auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import { MoviesProvider } from "./Contexts/Movies/MoviesProvider";

const router = createBrowserRouter([...Routes]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <MoviesProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </MoviesProvider>
    </AuthProvider>
  </StrictMode>
);
