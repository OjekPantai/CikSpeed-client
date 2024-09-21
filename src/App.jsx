import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
import OrderPage from "./pages/OrderPage";
import CustomerPage from "./pages/CustomerPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import { ThemeProvider } from "./components/theme-provider";

import { action as LoginAction } from "./pages/LoginPage";
import { action as RegisterAction } from "./pages/RegisterPage";

// Storage
import { store } from "./stores/store";

// Import ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "services",
        element: <ServicePage />,
      },
      {
        path: "orders",
        element: <OrderPage />,
      },
      {
        path: "customers",
        element: <CustomerPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    action: LoginAction(store),
  },
  {
    path: "/register",
    element: <RegisterPage />,
    action: RegisterAction(store),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
