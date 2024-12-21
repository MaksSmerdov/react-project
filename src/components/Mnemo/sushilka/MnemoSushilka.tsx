import React, { useState } from 'react';
import styles from './MnemoSushilka.module.scss';
import { apiConfigs } from '../../../config/apiConfig';
import useMnemoDryer from './useMnemoSushilka';
import CustomModal from '../../Common/Modal/Modal';
import DocumentationAccordion from '../../Common/Accordion/Accordion';
import { AccordionItems } from './AccordionItems';
import Tooltip from '../../Common/Tooltip/Tooltip';
import Kran from '../../Common/Kran/KranComponent';
import Loader from '../../Common/Preloader/Preloader';
import ControlButtons from '../../Common/ControlButtons/ControlButtons';
import { staticLabels, tooltippedParams, gorelkaGifs, getTooltipContent, renderGIF } from './MnemoUtils';
import Header from '../../Common/Header/Header';

interface MnemoDryerProps<K extends keyof typeof apiConfigs> {
  configKey: K;
  title: string;
  dryerNumber: number;
}

const MnemoDryer = <K extends keyof typeof apiConfigs>({ configKey, title, dryerNumber }: MnemoDryerProps<K>) => {
  const { data, isLoading, tooltipsEnabled, toggleTooltips, animationsRunning, isGif2Visible, isGorelkaGifsVisible } =
    useMnemoDryer({ config: apiConfigs[configKey], dryerNumber });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Параметры без тултипов
  const nonTooltippedParams = [
    {
      className: styles.mosh_gorelki,
      value: data.gorelka?.[`Мощность горелки №${dryerNumber}`] ?? '-',
      unit: '%',
    },
    {
      className: styles.zadanie_temper,
      value: data.gorelka?.[`Задание температуры №${dryerNumber}`] ?? '-',
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
        />

        <CustomModal open={isModalOpen} title="Список документации" onClose={() => setIsModalOpen(false)}>
          <div className="mnemo__modal-window">
            <DocumentationAccordion items={AccordionItems} enterTimeout={300} exitTimeout={300} />
          </div>
        </CustomModal>

        <img src="/assets/img/sushilka.jpg" alt="Сушилка" className={styles['mnemo__img']} />

        <div className={styles.mnemo__kranContainer}>
          <Kran
            size={{ width: 41, height: 40 }}
            status={Boolean(data.im?.['Индикация паротушения'])}
            orientation="vertical"
          />
        </div>

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
            <Tooltip key={idx} tooltipId={param.id} content={getTooltipContent(param.id)} disabled={!tooltipsEnabled}>
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

export default MnemoDryer;
