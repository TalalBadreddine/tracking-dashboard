import React from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from 'recharts';

interface PageViewCount {
    pageUrl: string;
    viewPageCount: number;
}

interface ViewsPerPagePieChartProps {
    data: PageViewCount[];
}

const getLastTwoSegments = (url: string) => {
    const segments = url.split('/').filter(Boolean);
    return segments.slice(-2).join('/');
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

const ViewsPerPagePieChart: React.FC<ViewsPerPagePieChartProps> = ({ data }) => (
    <ResponsiveContainer width="100%" height={400}>
        <PieChart>
            <Pie
                data={data}
                dataKey="viewPageCount"
                nameKey="pageUrl"
                outerRadius={100}
                label
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend
                formatter={(value) => getLastTwoSegments(value)}
            />
        </PieChart>
    </ResponsiveContainer>
);

export default ViewsPerPagePieChart;
