import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const Dashboard = lazy(() => import("../views/Dashboard.tsx"));
const Wallet = lazy(() => import("../views/Wallet.tsx"));
const Protocols = lazy(() => import("../views/Protocols.tsx"));
const History = lazy(() => import("../views/History.tsx"));
const Alerts = lazy(() => import("../views/Alerts.tsx"));

/*****Routes******/
const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/protocols" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/wallet", exact: true, element: <Wallet /> },
      { path: "/protocols", exact: true, element: <Protocols /> },
      { path: "/history", exact: true, element: <History /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
    ],
  },
];

export default ThemeRoutes;
