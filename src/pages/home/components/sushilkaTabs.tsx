import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from '../homePage.module.scss';
import MnemoSushilka from '../../../components/Mnemo/sushilka/mnemoSushilka';
import CurrentParameter from '../../../components/Current/sushilka/currentParameter';
import { apiConfigs } from '../../../configs/apiConfigSushilka';
import UniversalChart from '../../../components/Charts/chart';
import { IntervalProvider } from '../../../components/Charts/context/intervalContext';
import { getApiBaseUrl } from '../../../utils/apiUtils';

interface SushilkaTabsProps {
  selectedSubTabIndex: number;
  handleSubTabChange: (index: number) => void;
  sushilkaNumber: number;
}

const SushilkaTabs: React.FC<SushilkaTabsProps> = ({ selectedSubTabIndex, handleSubTabChange, sushilkaNumber }) => {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <Tabs selectedIndex={selectedSubTabIndex} onSelect={handleSubTabChange}>
      <TabList className={styles['sub-tab-list']}>
        <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
          Мнемосхема
        </Tab>
        <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
          Текущие параметры
        </Tab>
        <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
          Графики температур
        </Tab>
        <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
          Графики давлений
        </Tab>
      </TabList>

      <TabPanel>
        <div key={`sushilka${sushilkaNumber}-mnemo-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
          <MnemoSushilka configKey={`sushilka${sushilkaNumber}`} title={`Сушилка №${sushilkaNumber}`} objectNumber={sushilkaNumber} />
        </div>
      </TabPanel>

      <TabPanel>
        <div key={`sushilka${sushilkaNumber}-params-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
          <CurrentParameter config={apiConfigs[`sushilka${sushilkaNumber}`]} title={`Сушилка №${sushilkaNumber}`} />
        </div>
      </TabPanel>

      <TabPanel>
        <div key={`sushilka${sushilkaNumber}-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
          <IntervalProvider>
            <UniversalChart
              id={`chart-sushilka${sushilkaNumber}`}
              apiUrls={`${apiBaseUrl}/api/sushilka${sushilkaNumber}/data`}
              title={`График температур сушилки №${sushilkaNumber}`}
              yMin={-315}
              yMax={315}
              dataKey="temperatures"
              params={[
                { key: 'Температура в топке', label: 'В топке', unit: '°C' },
                { key: 'Температура в камере смешения', label: 'В камере смешения', unit: '°C' },
                { key: 'Температура уходящих газов', label: 'Уходящих газов', unit: '°C' },
              ]}
              showIntervalSelector={true}
            />
          </IntervalProvider>
        </div>
      </TabPanel>

      <TabPanel>
        <div key={`sushilka${sushilkaNumber}-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
          <IntervalProvider>
            <UniversalChart
              id={`chart-sushilka${sushilkaNumber}`}
              apiUrls={`${apiBaseUrl}/api/sushilka${sushilkaNumber}/data`}
              title={`График давления/разрежения сушилки №${sushilkaNumber}`}
              yMin={-20}
              yMax={30}
              dataKey="vacuums"
              params={[
                { key: 'Разрежение в топке', label: 'В топке', unit: 'кгс/см²' },
                { key: 'Разрежение в камере выгрузки', label: 'В камере выгрузки', unit: 'кгс/см²' },
                { key: 'Разрежение воздуха на разбавление', label: 'Воздух на разбавление', unit: 'кгс/м²' },
              ]}
              showIntervalSelector={true}
            />
          </IntervalProvider>
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default SushilkaTabs;