export type LogEntry = {
    dateTime: string;
    msg: string;
    level: string;
    source: string;
    id: string;
};

export interface LogsListProps {
    logs: string[];
};

export interface LogRowProps {
    log: LogEntry;
    searchTerm: string;
}