import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useParams } from "next/navigation";
import axios from "lib/axios";
import { cn } from "lib/utils";

export interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const router = useRouter();
  const params = useParams<{ id: string }>()

  const { toast } = useToast();


  const [dashboards, setDashboards] = useState<{ id: number, name: string }[]>([])

  const getAllDashboards = () => {
    axios.get<{ id: number, name: string }[]>("/project").then((resp) => {
      if (resp?.data) {
        setDashboards(resp.data)
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again" onClick={() => window.location.reload()}>Try again</ToastAction>,
        })
      }
    })
  }
  useEffect(() => {
    getAllDashboards()
  }, [])

  const navigateToDashboard = (dashboardId: string) => {
    router.push(`/dashboard/${dashboardId}`);
  };

  const currentDashboard = params?.id

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className={cn("mb-2 px-2 text-lg font-semibold tracking-tight hover:cursor-pointer rounded-xl", !currentDashboard && "bg-gray-200 hover:bg-gray-300")} onClick={() => router.push("/")}>
            Dashboards
          </h2>
          <div className="flex-col flex space-y-1">
            {dashboards?.map(({ id, name }) => (
              <Button
                variant="secondary"
                size="sm"
                key={id}
                className={cn("w-fit-content min-w-[200px] capitalize justify-start hover:bg-blue-100 rounded-full", name == currentDashboard && "bg-blue-100")}
                onClick={() => navigateToDashboard(name)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
