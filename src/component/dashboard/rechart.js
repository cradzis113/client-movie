import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const VideoChart = ({ data, categoryData }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const getDataMonth = () => {
            const requiredMonths = 5;
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const arr = [];

            for (let i = 1; i < currentMonth; i++) {
                const monthName = getMonthName(i);
                const monthData = data[currentYear]?.find(item => item.month === monthName);

                if (monthData) {
                    arr.push({ month: monthName, [categoryData]: monthData[categoryData] });
                } else {
                    arr.push({ month: monthName, [categoryData]: 0 });
                }
            }

            if (arr.length !== requiredMonths) {
                const hasJanuary = arr.some(item => item.month === 'Jan');
                if (hasJanuary) {
                    const missingMonthsCount = requiredMonths - arr.length;
                    const lastYearData = data[currentYear - 1];
                    const lastTwoElements = lastYearData.slice(-missingMonthsCount).reverse();
                    lastTwoElements.forEach(obj => {
                        arr.unshift({ month: obj.month, [categoryData]: obj[categoryData] });
                    });
                }
            }

            return arr;
        }

        const chartData = getDataMonth();
        setChartData(chartData);
    }, [data, categoryData]);

    const getMonthName = (month) => {
        switch (month) {
            case 1:
                return 'Jan';
            case 2:
                return 'Feb';
            case 3:
                return 'Mar';
            case 4:
                return 'Apr';
            case 5:
                return 'May';
            case 6:
                return 'Jun';
            case 7:
                return 'Jul';
            case 8:
                return 'Aug';
            case 9:
                return 'Sep';
            case 10:
                return 'Oct';
            case 11:
                return 'Nov';
            case 12:
                return 'Dec';
            default:
                return '';
        }
    }

    return (
        <Paper elevation={2} style={{ padding: 20 }}>
            <Chip
                icon={<TrendingUpIcon />}
                label={categoryData}
                variant="outlined"
                size="medium"
            />
            <ResponsiveContainer width="90%" height={400} style={{ margin: 'auto' }}>
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 40, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{dy: 8}}/>
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey={categoryData} stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default VideoChart;
