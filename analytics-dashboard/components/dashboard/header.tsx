import { Label } from "components/ui/label";

export function DashboardHeader({ dashboardId }: { dashboardId: string }) {
  return (
    <div className="flex justify-center items-center capitalize h-16">
      <Label className="text-3xl font-semibold text-gray-800">
        {dashboardId}
      </Label>
    </div>
  );
}
