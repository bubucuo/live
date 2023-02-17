import React from "react";
import {createBrowserRouter, RouterProvider} from "./which";

import Home from "./pages/Home";
import Product from "./pages/Product";
import User from "./pages/User";
import CustomLink from "./components/CustomLink";
import ProductDetail from "./pages/ProductDetail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import AuthProvider, {RequireAuth} from "./layouts/AuthProvider";
import Layout from "./layouts/Layout";
import DataLoading, {loaderOfDataLoading} from "./pages/DataLoading";

const AboutLazy = React.lazy(() => import("./pages/AboutLazy"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        // 标记当匹配到父路由的时候，显示此组件
        index: true,
        element: <Home />,
      },
      {
        path: "user",
        element: (
          <RequireAuth>
            <User />
          </RequireAuth>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/product",
        element: <Product />,
        children: [
          {
            path: "/product/:id",
            element: <ProductDetail />,
          },
        ],
      },

      {
        path: "dataloading",
        element: <DataLoading />,
        loader: loaderOfDataLoading,
        errorElement: (
          <div>Oops! There was an error.（切换路由的时候断网会显示此错误）</div>
        ),
      },
      {
        path: "about",
        element: (
          <React.Suspense fallback={<h1>loading...</h1>}>
            <AboutLazy />
          </React.Suspense>
        ),
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
]);

export default function () {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
