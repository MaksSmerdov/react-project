import React, { useState, useRef, useEffect } from "react";
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sushilka-1' | 'sushilka-2' | null>(null);
  const [iframeSrc, setIframeSrc] = useState<string>('');
  const [iframeError, setIframeError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

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

  const adjustIframeHeight = () => {
    if (iframeRef.current) {
      try {
        const iframe = iframeRef.current;
        const height = iframe.contentWindow?.document.body.scrollHeight || 500; // Установка минимальной высоты
        iframe.style.height = `${height + 100}px`; // Добавляем отступ
      } catch (error) {
        console.error('Ошибка при вычислении высоты iframe:', error);
      }
    }
  };

  useEffect(() => {
    if (iframeSrc) {
      setIframeError(null); // Сбрасываем ошибку
      const timer = setTimeout(() => adjustIframeHeight(), 100);
      return () => clearTimeout(timer);
    }
  }, [iframeSrc]);

  return (
    <div className={styles['container']}>
      <div className={styles['tab-container']}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as 'sushilka-1' | 'sushilka-2');
              setIframeSrc(subTabs[tab.id as 'sushilka-1' | 'sushilka-2'][1].url);
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

      {iframeSrc && (
        <div className={styles['iframe-container']}>
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title="Content Frame"
            style={{ width: '100%', border: 'none', height: '600px' }} // Устанавливаем стандартную высоту
            onLoad={adjustIframeHeight}
            onError={() => setIframeError('Ошибка загрузки контента')}
          />
          {iframeError && <div className={styles['error']}>{iframeError}</div>}
        </div>
      )}
    </div>
  );
};

export default HomePage;
