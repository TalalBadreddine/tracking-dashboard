
interface PageClickCount {
    pageUrl: string;
    clickCount: number;
}

interface PageTimeSpent {
    pageUrl: string;
    durationPerPage: number;
}

interface PageViewCount {
    pageUrl: string;
    viewPageCount: number;
}

interface EventModel {
    totalClicks: number;
    timeSpentInProject: number;
    errorCount: number;
    totalClickInEachPage: PageClickCount[];
    timeSpentInPage: PageTimeSpent[];
    pageViewCount: PageViewCount[];
}

interface MetricsUpdate {
    projectName: string;
    type: string;
    data: EventModel;
}
