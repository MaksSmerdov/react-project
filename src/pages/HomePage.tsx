import React, { useState } from "react";
import styles from './HomePage.module.scss';
import MnemoSushilka from "../components/Mnemo/sushilka/MnemoSushilka";
import CurrentParameterUniversal from "../components/Common/CurrentParameterUniversal/CurrentParameterUniversal";
import { apiConfigs } from "../configs/apiConfigSushilka";
import TemperatureChart from "../components/Charts/Chart";



const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sushilka-1' | 'sushilka-2' | null>(null);
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(null);

  const tabs = [
    { id: 'sushilka-1', label: 'Сушилка-1' },
    { id: 'sushilka-2', label: 'Сушилка-2' },
  ];

  const subTabs: {
    'sushilka-1': { label: string; component: React.ReactNode }[];
    'sushilka-2': { label: string; component: React.ReactNode }[];
  } = {
    'sushilka-1': [
      { label: 'Мнемосхема', component: <MnemoSushilka configKey="sushilka1" title="Сушилка №1" objectNumber={1} /> },
      { label: 'Текущие параметры', component: <CurrentParameterUniversal config={apiConfigs.sushilka1} title="Вращающаяся сушилка №1" /> },
      {
        label: 'Графики',
        component: (
          <div> 
            <TemperatureChart 
            apiUrl="http://localhost:3002/api/sushilka1/data" 
            title="Температуры сушилки №1" 
            yMin = {0}
            yMax = {300} />

            <TemperatureChart 
            apiUrl="http://localhost:3002/api/sushilka2/data" 
            title="Температуры сушилки №2" 
            yMin = {0}
            yMax = {300} />
          </div>
        ),
      },
      
    ],
    'sushilka-2': [
      { label: 'Мнемосхема', component: <MnemoSushilka configKey="sushilka2" title="Сушилка №2" objectNumber={2} /> },
      { label: 'Текущие параметры', component: <CurrentParameterUniversal config={apiConfigs.sushilka2} title="Вращающаяся сушилка №2" /> },
      
    ],
  };

  return (
    <div className={styles['container']}>
      <div className={styles['tab-container']}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as 'sushilka-1' | 'sushilka-2');
              setActiveComponent(subTabs[tab.id as 'sushilka-1' | 'sushilka-2'][0].component); // По умолчанию отображаем первый компонент
            }}
            className={`${styles['tab-container__button']} ${
              activeTab === tab.id ? styles['tab-container__button--active'] : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles['tab-content']}>
        {activeTab && (
          <div className={styles['tab-container-box']}>
            <h2 className={styles['tab-content__title']}>{tabs.find((tab) => tab.id === activeTab)?.label}</h2>
            <div className={styles['tab-content__sub-tab-container']}>
              {subTabs[activeTab].map((subTab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveComponent(subTab.component)}
                  className={styles['sub-tab-button']}
                >
                  {subTab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles['component-container']}>
        {activeComponent}
      </div>
    </div>
  );
};

export default HomePage;
