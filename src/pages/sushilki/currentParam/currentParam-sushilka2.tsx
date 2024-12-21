import React from "react";
import CurrentParameterUniversal from "../../../components/Common/CurrentParameterUniversal/CurrentParameterUniversal";
import { apiConfigs } from "../../../configs/apiConfigSushilka";

const CurrentParameterSushilka2: React.FC = () => {
  return <CurrentParameterUniversal config={apiConfigs.sushilka2} title="Вращающаяся сушилка №2" />;
};

export default CurrentParameterSushilka2;
