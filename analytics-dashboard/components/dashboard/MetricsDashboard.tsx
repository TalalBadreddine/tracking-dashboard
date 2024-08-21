import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ClickCountsChart from './ClickCountChart';
import ViewsPerPagePieChart from './PageViewCountChart';
import TimeSpentChart from './TimeSpentInPageChart';

const Placeholder = ({ message }: {message: string}) => (
    <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">{message}</p>
    </div>
);

const MetricsDashboard = ({ metrics }: {metrics: EventModel}) => {
    return (
        <Tabs
            defaultValue="chart1"
            className="w-full bg-white py-2 px-6 rounded-xl shadow-md h-full min-h-full"
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart1" className="data-[state=active]:bg-blue-400 rounded-xl data-[state=active]:text-white">Charts</TabsTrigger>
                <TabsTrigger value="chart2" className="data-[state=active]:bg-blue-400 rounded-xl data-[state=active]:text-white">Other Types Of Charts</TabsTrigger>
            </TabsList>
            <br />
            <TabsContent value="chart1" className="w-full min-h-[500px]">
                <div className="w-full min-h-[500px] mt-10">
                    <div
                        data-aos="fade-in"
                        data-aos-duration="1000"
                        data-aos-delay="100"
                        className="mb-8 w-full min-h-[250px] "
                    >
                        <h2 className="text-lg font-semibold mb-4 text-center">Click Count Per Page</h2>
                        {metrics?.totalClickInEachPage?.length > 0 ? (
                            <ClickCountsChart data={metrics.totalClickInEachPage} />
                        ) : (
                            <Placeholder message="No click count data available." />
                        )}
                    </div>
                    <div
                        data-aos="fade-in"
                        data-aos-duration="1000"
                        data-aos-delay="300"
                        className="w-full min-h-[250px] text-center"
                    >
                        <h2 className="text-lg font-semibold mb-4 text-center">Time Spent Per Page</h2>
                        {metrics?.timeSpentInPage?.length > 0 ? (
                            <TimeSpentChart data={metrics.timeSpentInPage} />
                        ) : (
                            <Placeholder message="No time spent data available." />
                        )}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="chart2" className="w-full min-h-[500px] mt-8 items-center">
                <div
                    data-aos="fade-in"
                    data-aos-duration="1000"
                    data-aos-delay="100"
                >
                    <h2 className="text-lg m-auto font-semibold mb-4 text-center">Page View Distribution</h2>
                    {metrics?.pageViewCount?.length > 0 ? (
                        <ViewsPerPagePieChart data={metrics.pageViewCount} />
                    ) : (
                        <Placeholder message="No page view data available." />
                    )}
                </div>
            </TabsContent>
        </Tabs >
    );
};

export default MetricsDashboard;
