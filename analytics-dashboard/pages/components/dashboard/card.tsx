import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, className }) => {
  return (
    <Card className={`bg-white rounded-xl hover:scale-105 transition-transform duration-300 hover:cursor-pointer shadow-md ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
