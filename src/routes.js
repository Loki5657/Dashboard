import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./components/dashboard";
import LineChart from "./components/shared/lineChart";
import Modalcomponent from "../src/components/shared/modal";
import { BarChart } from "./components/shared/barChart";
import { Login } from "./components/shared/logoin";





const AppRoutes = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/linechart" element={<LineChart />} />
        <Route path="/modal" element={<Modalcomponent />} />
        <Route path="/barChart" element={<BarChart />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
};
export default AppRoutes;
