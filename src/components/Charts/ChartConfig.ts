// src/components/Charts/ChartConfig.ts

import { ChartOptions } from 'chart.js';

export const getChartOptions = (
    startTime: number,
    endTime: number
): ChartOptions<'line'> => ({
    responsive: true,
    animation: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        legend: {
            display: true,
            position: 'right',
            labels: {
                generateLabels: (chart) => {
                    return chart.data.datasets.map((dataset, index) => {
                        const value = dataset.data.length
                            ? dataset.data[dataset.data.length - 1]
                            : ''; // Последнее значение
                        const label = dataset.label || '';
                        return {
                            text: `${value} | ${label}`, // Формат «Значение | Название»
                            fillStyle: dataset.borderColor as string,
                            hidden: !chart.isDatasetVisible(index),
                            datasetIndex: index, // Ссылка на индекс набора данных
                        };
                    });
                },
            },
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: function (context) {
                    const label = context.dataset.label || '';
                    const value = context.parsed.y !== null ? context.parsed.y : '';
                    return `${label}: ${value}°C`;
                },
            },
        },
        crosshair: {
            line: {
                color: 'black',
                width: 1,
            },
            sync: {
                enabled: false,
            },
            zoom: {
                enabled: false,
            },
            snap: {
                enabled: true,
            },
        },
    },
    scales: {
        x: {
            type: 'time', // Вернули 'time' вместо 'timeseries'
            time: {
                unit: 'minute',
                displayFormats: {
                    minute: 'HH:mm',
                },
            },
            ticks: {
                maxTicksLimit: 20,
            },
            min: startTime, // Преобразовано в миллисекунды
            max: endTime + 3 * 60 * 1000, // Преобразовано в миллисекунды с отступом 5 минут
        },
        y: {
            beginAtZero: false,
        },
    },
});
