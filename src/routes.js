import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Dashboard } from "./components/dashboard";
import LineChart from "./components/shared/lineChart";





const AppRoutes = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/linechart" element={<LineChart />} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;
