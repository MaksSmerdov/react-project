import React from "react";
import { Routes, Route } from "react-router-dom";
import CurrentParameterSushilka1 from "./pages/sushilki/currentParam/currentParam-sushilka1";
import CurrentParameterSushilka2 from "./pages/sushilki/currentParam/currentParam-sushilka2";
import MnemoSushilka1 from "./pages/sushilki/mnemo/mnemo-sushilka1";
import MnemoSushilka2 from "./pages/sushilki/mnemo/mnemo-sushilka2";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/currentParam-sushilka1"
          element={<CurrentParameterSushilka1 />}
        />
        <Route
          path="/currentParam-sushilka2"
          element={<CurrentParameterSushilka2 />}
        />
        <Route
          path="/mnemo-sushilka1"
          element={<MnemoSushilka1 />}
        />
        <Route
          path="/mnemo-sushilka2"
          element={<MnemoSushilka2 />}
        />
      </Routes>
    </div>
  );
};

export default App;
