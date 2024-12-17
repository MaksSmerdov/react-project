import React from "react";
import CurrentParameterUniversal from "../../components/CurrentParameterUniversal/CurrentParameterUniversal";
import { apiConfigs } from "../../config/apiConfig";

const CurrentParameterMills: React.FC = () => {
  return (
    <div>
      <CurrentParameterUniversal config={apiConfigs.mill10b} title="Мельница 10b" />
      <CurrentParameterUniversal config={apiConfigs.mill1} title="Мельница 1" />
      <CurrentParameterUniversal config={apiConfigs.mill2} title="Мельница 2" />
    </div>
  );
};

export default CurrentParameterMills;
