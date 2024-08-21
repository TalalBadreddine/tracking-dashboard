import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PageClickCount {
    pageUrl: string;
    clickCount: number;
}

interface ClickCountsChartProps {
    data: PageClickCount[];
}

const ClickCountsChart: React.FC<ClickCountsChartProps> = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="pageUrl" tick={{ fontSize: 12, textAnchor: 'middle' }} tickFormatter={(value) => value.length > 20 ? `${value.split("/").slice(-1,).join("/")}` : value} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clickCount" fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
);

export default ClickCountsChart;
