import React, { useState } from 'react';
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sushilka-1' | 'sushilka-2' | null>(null); // Добавляем "null" как начальное значение
  const [iframeSrc, setIframeSrc] = useState<string>('');

  const tabs = [
    { id: 'sushilka-1', label: 'Сушилка-1' },
    { id: 'sushilka-2', label: 'Сушилка-2' },
  ];

  const subTabs: {
    'sushilka-1': { label: string; url: string }[];
    'sushilka-2': { label: string; url: string }[];
  } = {
    'sushilka-1': [
      { label: 'Текущие параметры', url: '/currentParam-sushilka1' },
      { label: 'Мнемосхема', url: '/mnemo-sushilka1' },
      { label: 'Графики температур', url: '/graph-sushilki-general-temper' },
      { label: 'Графики давл./разр.', url: '/graph-sushilki-general-pressure' },
    ],
    'sushilka-2': [
      { label: 'Текущие параметры', url: '/currentParam-sushilka2' },
      { label: 'Мнемосхема', url: '/mnemo-sushilka2' },
      { label: 'Графики температур', url: '/graph-sushilki-general-temper' },
      { label: 'Графики давл./разр.', url: '/graph-sushilki-general-pressure' },
    ],
  };

  return (
    <div className={styles['container']}>
      {/* Кнопки выбора сушилок */}
      <div className={styles['tab-container']}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as 'sushilka-1' | 'sushilka-2');
              setIframeSrc(subTabs[tab.id as 'sushilka-1' | 'sushilka-2'][1].url); // Автоматически открываем "Мнемосхему"
            }}
            className={`${styles['tab-container__button']} ${
              activeTab === tab.id ? styles['tab-container__button--active'] : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
  
      {/* Контент активной вкладки */}
      <div className={styles['tab-content']}>
        {activeTab && (
          <div className={styles['tab-container-box']}>
            {/* Заголовок слева */}
            <h2 className={styles['tab-content__title']}>{tabs.find((tab) => tab.id === activeTab)?.label}</h2>
  
            {/* Под-кнопки справа */}
            <div className={styles['tab-content__sub-tab-container']}>
              {subTabs[activeTab].map((subTab, index) => (
                <button
                  key={index}
                  onClick={() => setIframeSrc(subTab.url)}
                  className={styles['sub-tab-button']}
                >
                  {subTab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
  
      {/* Iframe для отображения содержимого */}
      {iframeSrc && (
        <div className={styles['iframe-container']}>
          <iframe
            src={iframeSrc}
            title="Content Frame"
            style={{ width: '100%', height: '1000px', border: 'none' }}
          />
        </div>
      )}
    </div>
  );  
};

export default HomePage;
