import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

interface TimeSpentChartProps {
    data: { pageUrl: string; durationPerPage: number }[];
}

const secondsToHours = (seconds: number) => (seconds / 3600).toFixed(2);

const TimeSpentChart: React.FC<TimeSpentChartProps> = ({ data }) => {
    const chartWidth = data.length * 50;

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ width: chartWidth, minWidth: '100%' }}>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="pageUrl"
                            tick={{
                                fontSize: 10,
                                textAnchor: 'middle',
                            }}
                            tickMargin={10}
                            tickFormatter={(value) => value.split('/').slice(-1)[0]}
                        />
                        <YAxis
                            tickFormatter={(value) => `${secondsToHours(value)} hrs`}
                        />
                        <Tooltip
                            formatter={(value: any) => [`${secondsToHours(value)} hrs`, 'Time Spent']}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="durationPerPage" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TimeSpentChart;