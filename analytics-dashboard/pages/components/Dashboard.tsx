import { useEffect, useRef, useState } from "react";
import { DashboardHeader } from "./dashboard/header";
import CalendarForm from "./dashboard/calendar"
import { useParams } from "next/navigation";
import StatsCardGrid from "./dashboard/StatsCardGrid";
import { useWebSocket } from "@/context/Socket";
import ClickCountsChart from "./dashboard/ClickCountChart";
import TimeSpentChart from "./dashboard/TimeSpentInPageChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ViewsPerPagePieChart from "./dashboard/PageViewCountChart";
import MetricsDashboard from "./dashboard/MetricsDashboard";


export const Dashboard = () => {
  const params = useParams<{ id: string }>()
  const { sendMessage, metrics, handleProjectNameChange } = useWebSocket();
  const projectName = params?.id || '';


  useEffect(() => {
    const interval = setInterval(() => {
      if (projectName) {
        handleProjectNameChange(projectName)
        sendMessage('update_data', { projectName });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [projectName]);

  return (
    <div>
      <DashboardHeader dashboardId={params?.id?.toString()!} />
      <br />
      <CalendarForm />
      <br />
      <StatsCardGrid totalClickCount={metrics?.totalClicks || 0} totalTimeSpent={metrics?.timeSpentInProject || 0} totalCountOrErrors={metrics?.errorCount || 0} />
      <br />
      <MetricsDashboard metrics={metrics} />
    </div>
  );
};
