import { FixedSizeList } from 'react-window';

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
};

export interface LevelColor {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
};

export interface AutoSizerProps {
    height: number;
    width: number;
};

export interface LevelFilterDropdownProps { 
    levels: string[], 
    selectedLevels: string[], 
    toggleLevel: (level: string) => void,
    dropdownOpen: boolean,
    setDropdownOpen: (open: boolean) => void,
    dropdownRef: React.RefObject<HTMLDivElement | null>
};

export interface SearchInputProps { 
    searchTerm: string, 
    setSearchTerm: (term: string) => void 
};

export interface VirtualLogsListProps { 
    logs: LogEntry[], 
    isMobile: boolean, 
    listRef: React.RefObject<FixedSizeList<unknown> | null>, 
    searchTerm: string 
};