import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Dashboard } from "./components/dashboard";
import LineChart from "./components/shared/lineChart";
import  Modalcomponent  from "../src/components/shared/modal";





const AppRoutes = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/linechart" element={<LineChart />} />
        <Route path="/modal" element={<Modalcomponent />} />

      </Routes>
    </Router>
  );
};
export default AppRoutes;
