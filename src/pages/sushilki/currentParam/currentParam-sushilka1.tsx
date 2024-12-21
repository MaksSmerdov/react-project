import React from "react";
import CurrentParameterUniversal from "../../../components/Common/CurrentParameterUniversal/CurrentParameterUniversal";
import { apiConfigs } from "../../../config/apiConfig";

const CurrentParameterSushilka1: React.FC = () => {
  return <CurrentParameterUniversal config={apiConfigs.sushilka1} title="Вращающаяся сушилка №1" />;
};

export default CurrentParameterSushilka1;
