import { ChartOptions } from 'chart.js';

export const getChartOptions = (
    startTime: number,
    endTime: number,
    title: string,
    yMin?: number, // Новый аргумент для минимального значения оси Y
    yMax?: number  // Новый аргумент для максимального значения оси Y
): ChartOptions<'line'> => ({
    responsive: true,
    animation: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        title: {
            display: true,
            text: title,
            font: {
                size: 18,
                weight: 'bold',
            },
            color: 'green',
            padding: {
                top: 10,
                bottom: 20,
            },
        },
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
                            datasetIndex: index,
                        };
                    });
                },
            },
        },
        tooltip: {
            enabled: true,
            callbacks: {
                title: (tooltipItems) => {
                    if (tooltipItems.length > 0) {
                        const parsedTime = tooltipItems[0].parsed.x; // Берем исходное значение времени
                        if (typeof parsedTime === 'number') {
                            const date = new Date(parsedTime);
                            const dateString = date.toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit',
                            });
                            const timeString = date.toLocaleTimeString('ru-RU', {
                                hour: '2-digit',
                                minute: '2-digit',
                            });
                            return `${dateString} ${timeString}`; // Форматируем в "24.12.24 16:00"
                        }
                    }
                    return ''; // Возвращаем пустую строку, если данных нет
                },
                label: (context) => {
                    const label = context.dataset.label || '';
                    const value = context.raw !== null ? context.raw : '—';
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
            type: 'time',
            time: {
                unit: 'minute',
                displayFormats: {
                    minute: 'HH:mm',
                },
            },
            ticks: {
                maxTicksLimit: 20,
            },
            min: startTime,
            max: endTime + 2 * 60 * 1000,
        },
        y: {
            beginAtZero: false,
            min: yMin, // Используем переданное минимальное значение
            max: yMax, // Используем переданное максимальное значение
        },
    },
    elements: {
        point: {
            radius: 0, // Убираем радиус точек, оставляя только линии
        },
    },
});
