// src/components/Charts/Chart.tsx

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    ChartOptions,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import CrosshairPlugin from 'chartjs-plugin-crosshair';
import { useTemperatureData } from './hooks/useData';
import { getChartOptions } from './ChartConfig';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    CrosshairPlugin
);

const TemperatureChart: React.FC = () => {
    const [startTime, setStartTime] = useState(new Date(Date.now() - 30 * 60 * 1000));
    const [endTime, setEndTime] = useState(new Date());
    const [allHidden, setAllHidden] = useState(false); // Состояние для управления видимостью всех данных

    const { data, error, refetch } = useTemperatureData(startTime, endTime);

    // Обновление времени каждые 5 секунд
    useEffect(() => {
        const interval = setInterval(() => {
            setEndTime(new Date());
            setStartTime(new Date(Date.now() - 30 * 60 * 1000));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Перезагрузка данных при изменении времени
    useEffect(() => {
        refetch();
    }, [startTime, endTime, refetch]);

    const handleBackward = () => {
        const newStartTime = new Date(startTime.getTime() - 60 * 60 * 1000);
        const newEndTime = new Date(endTime.getTime() - 60 * 60 * 1000);
        setStartTime(newStartTime);
        setEndTime(newEndTime);
    };

    const handleForward = () => {
        const newStartTime = new Date(startTime.getTime() + 60 * 60 * 1000);
        const newEndTime = new Date(endTime.getTime() + 60 * 60 * 1000);
        setStartTime(newStartTime);
        setEndTime(newEndTime);
    };

    const handleToggleAll = () => {
        const chart = ChartJS.getChart("temperatureChart"); // Получение экземпляра графика
        if (chart) {
            chart.data.datasets.forEach((_, index) => {
                const meta = chart.getDatasetMeta(index);
                meta.hidden = !allHidden; // Скрыть или показать все
            });
            chart.update(); // Обновить график
        }
        setAllHidden(!allHidden); // Обновить состояние кнопки
    };

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    const temperatures = data.map((item) => ({
        time: new Date(item.lastUpdated),
        boilerTemp: item.temperatures['Температура в топке'],
        mixingTemp: item.temperatures['Температура в камере смешения'],
        exhaustTemp: item.temperatures['Температура уходящих газов'],
    }));

    const chartData = {
        labels: temperatures.map((t) => t.time),
        datasets: [
            {
                label: 'Температура в топке',
                data: temperatures.map((t) => t.boilerTemp),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
            {
                label: 'Температура в камере смешения',
                data: temperatures.map((t) => t.mixingTemp),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
            {
                label: 'Температура уходящих газов',
                data: temperatures.map((t) => t.exhaustTemp),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const options: ChartOptions<'line'> = getChartOptions(
        startTime.getTime(),
        endTime.getTime()
    );

    // Отключаем отзывчивость, чтобы использовать фиксированные размеры
    options.responsive = false;

    return (
        <div>
            <h2>Температуры за последние 30 минут</h2>
            <Line
                id="temperatureChart"
                data={chartData}
                options={options}
                width={2000}  // Установите желаемую ширину
                height={400} // Установите желаемую высоту
            />
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleBackward}>Назад</button>
                <button onClick={handleForward} style={{ marginLeft: '10px' }}>
                    Вперед
                </button>
                <button onClick={handleToggleAll} style={{ marginLeft: '10px' }}>
                    {allHidden ? 'Показать все' : 'Скрыть все'}
                </button>
            </div>
        </div>
    );
};

export default TemperatureChart;
