import React from 'react';
import StatsCard from './card';
import { Ban, MousePointerClick, Timer } from 'lucide-react';
import moment from "moment"

export interface StatusCardGridProps {
  totalClickCount: number,
  totalTimeSpent: number,
  totalCountOrErrors: number
}

function StatsCardGrid({ totalClickCount, totalTimeSpent, totalCountOrErrors }: StatusCardGridProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      <StatsCard
        title="Total Clicks"
        value={`${totalClickCount}`}
        change={""}
        icon={<MousePointerClick />} />

      <StatsCard
        title="Time Spent"
        value={`${moment.duration(totalTimeSpent, 'seconds').humanize()}`}
        change={<>
          About <span className='text-blue-500'>{(totalTimeSpent / 3600).toFixed(2)}</span> Hours
        </>}
        icon={<Timer />} />

      <StatsCard
        title="Errors"
        value={`${totalCountOrErrors}`}
        change=""
        icon={<Ban />} />
    </div>
  );
}

export default StatsCardGrid;
