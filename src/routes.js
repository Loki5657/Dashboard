import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./components/dashboard";
import LineChart from "./components/shared/lineChart";
import Modalcomponent from "../src/components/shared/modal";
import { PeiChart } from "./components/shared/peiChart";
import { Login } from "./components/shared/logoin";
import Users from "./components/shared/user";





const AppRoutes = () => {
  return (
    <Router>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/linechart" element={<LineChart />} />
        <Route path="/modal" element={<Modalcomponent />} />
        <Route path="/barChart" element={<PeiChart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;
