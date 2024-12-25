import React, { useState } from 'react';
import styles from './mnemoSushilka.module.scss';
import { apiConfigs } from '../../../configs/apiConfigSushilka';
import useMnemoSushilka from './useMnemoSushilka';
import CustomModal from '../../Common/Modal/modal';
import DocumentationAccordion from '../../Common/Accordion/accordion';
import { accordionData } from './accordionItems';
import Tooltip from '../../Common/Tooltip/tooltip';
import Kran from '../../Common/Kran/kranComponent';
import Loader from '../../Common/Preloader/preloader';
import ControlButtons from '../../Common/ControlButtons/controlButtons';
import { staticLabels, tooltippedParams, gorelkaGifs, getTooltipContent, renderGIF } from './mnemoUtils';
import Header from '../../Common/Header/header';

interface MnemoSushilkaProps<K extends keyof typeof apiConfigs> {
  configKey: K;
  title: string;
  objectNumber: number;
}

const MnemoSushilka = <K extends keyof typeof apiConfigs>({
  configKey,
  title,
  objectNumber,
}: MnemoSushilkaProps<K>) => {
  const { data, isLoading, tooltipsEnabled, toggleTooltips, animationsRunning, isGif2Visible, isGorelkaGifsVisible } =
    useMnemoSushilka({ config: apiConfigs[configKey], objectNumber });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Параметры без тултипов
  const nonTooltippedParams = [
    {
      className: styles.mosh_gorelki,
      value: data.gorelka?.[`Мощность горелки №${objectNumber}`] ?? '-',
      unit: '%',
    },
    {
      className: styles.zadanie_temper,
      value: data.gorelka?.[`Задание температуры №${objectNumber}`] ?? '-',
      unit: '%',
    },
  ];

  if (isLoading) {
    return <Loader loading={true} size={80} />;
  }

  return (
    <div className={styles.mnemoContainer}>
      <Header title={title} />
      <div className={styles.mnemo}>
        <ControlButtons
          tooltipsEnabled={tooltipsEnabled}
          onToggleTooltips={toggleTooltips}
          onOpenModal={() => setIsModalOpen(true)}
          top="0"
          left="0"
          adaptiveTop="100px"
          adaptiveLeft="300px"
        />

        <CustomModal isOpen={isModalOpen} title="Список документации" onClose={() => setIsModalOpen(false)}>
          <DocumentationAccordion accordionData={accordionData} enterTimeout={300} exitTimeout={300} />
        </CustomModal>

        <img src="/assets/img/sushilka.jpg" alt="Сушилка" className={styles['mnemo__img']} />

        <Kran
          size={{ width: 40, height: 34 }}
          status={Boolean(data.im?.['Индикация паротушения'])}
          orientation="vertical"
          top="40px"
          left="300px"
          adaptiveTop="25px"
          adaptiveLeft="180px"
        />

        {isGif2Visible && renderGIF('/assets/img/par.gif', styles['mnemo__gif-2'], animationsRunning, false)}
        {renderGIF('/assets/img/ventilator.png', styles['mnemo__gif-3'], animationsRunning)}
        {renderGIF('/assets/img/ventilator.png', styles['mnemo__gif-4'], animationsRunning)}

        {isGorelkaGifsVisible &&
          gorelkaGifs.map((gif, idx) => (
            <React.Fragment key={idx}>{renderGIF(gif.src, gif.className, animationsRunning)}</React.Fragment>
          ))}

        {/* Статические подписи */}
        {staticLabels.map((label, idx) => (
          <div key={idx} className={`${styles['mnemo__param-descr']} ${label.className}`}>
            {label.text}
          </div>
        ))}

        {/* Параметры с тултипами */}
        {tooltippedParams.map((param, idx) => {
          const value = data[param.source as keyof typeof data]?.[param.dataKey] ?? '-';
          return (
            <Tooltip
              key={idx}
              tooltipId={param.id}
              content={getTooltipContent(param.id)} // Контент тултипа
              disabled={!tooltipsEnabled} // Включен ли тултип
              width={param.width} // Базовая ширина
              responsiveWidth={param.responsiveWidth} // Адаптивная ширина
              placement="top" // Указываем расположение тултипа
            >
              <div
                className={`${styles['mnemo__param']} ${param.className} ${tooltipsEnabled ? styles.enabledHover : ''}`}
              >
                <span className={styles['mnemo__param-text']}>
                  {value} {value !== '-' ? param.unit : ''}
                </span>
              </div>
            </Tooltip>
          );
        })}

        {/* Параметры без тултипов */}
        {nonTooltippedParams.map((param, idx) => (
          <div key={idx} className={`${styles['mnemo__param']} ${param.className}`}>
            <span className={styles['mnemo__param-text']}>
              {param.value} {param.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MnemoSushilka;
