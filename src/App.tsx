import React from "react";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CatPage from "./pages/Cat/SingleCatPage";
import Home from "./pages/Home/HomePage";
import CatService from "./service/CatService";
import RootErrorBoundary from "./components/RootErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: async () => {
      return CatService.getBreeds("/breeds", {});
    },
    errorElement: <RootErrorBoundary />,
  },
  {
    path: "cat/:catId",
    element: <CatPage />,
    loader: async ({ params }) => {
      return CatService.getCat(params.catId!, "/images", {});
    },
    errorElement: <RootErrorBoundary />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
