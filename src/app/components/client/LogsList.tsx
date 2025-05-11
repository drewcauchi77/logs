"use client"

import { useMemo, useState, useRef, useEffect } from "react";
import { FixedSizeList as List } from 'react-window';
import { type LogEntry, LogsListProps } from "@/app/types/definitions";
import { dateInUtc } from "@/app/helpers/helpers";
import SearchInput from "./SearchInput";
import LevelFilterDropdown from "./LevelFilterDropdown";
import LogsTableHeader from "./TableHeader";
import VirtualLogsList from "./VirtualLogsList";

const LogsList: React.FC<LogsListProps> = ({ logs }: LogsListProps) => {
    const [levels, setLevels] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<List<unknown> | null>(null);
    
    const parsedLogs: LogEntry[] = useMemo(
        () => 
            logs.map((entry: string) => {
                const [ts, msg, level, source, id] = entry.split("|=|");

                const date: Date = new Date(ts);
                const dateTime: string = dateInUtc(date);

                if (!levels.includes(level.toLowerCase())) {
                    setLevels([...levels, level.toLowerCase()]);
                }

                return { dateTime, msg, level, source, id };
            }).sort((a: LogEntry, b: LogEntry) => Date.parse(b.dateTime) - Date.parse(a.dateTime)),
        [logs, levels]
    );

    const filteredLogs: LogEntry[] = useMemo(() => {
        const term: string = searchTerm.toLowerCase();

        return parsedLogs.filter((log: LogEntry) => {
            const textMatch: boolean = log.msg.toLowerCase().includes(term) || log.source.toLowerCase().includes(term);
            const levelMatch: boolean = selectedLevels.length === 0 || selectedLevels.includes(log.level.toLowerCase());

            return textMatch && levelMatch;
        })
    }, [parsedLogs, searchTerm, selectedLevels]);

    useEffect(() => {
        const handleClickOutside = (event: globalThis.MouseEvent): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        
        window.addEventListener('resize', checkMobile);
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollToItem(0);
        }
    }, [searchTerm, selectedLevels, isMobile]);

    const toggleLevel = (level: string): void => {
        if (selectedLevels.includes(level)) {
            setSelectedLevels(selectedLevels.filter((l: string) => l !== level));
        } else {
            setSelectedLevels([...selectedLevels, level]);
        }
    };

    return (
        <>
            <div className="mb-4 flex flex-col md:flex-row md:items-start gap-4 fixed top-0 z-10 w-full left-0 py-5 px-8 bg-white">
                <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <LevelFilterDropdown 
                    levels={levels} 
                    selectedLevels={selectedLevels} 
                    toggleLevel={toggleLevel}
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                    dropdownRef={dropdownRef}
                />
            </div>
            
            <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border mt-24 md:mt-12">
                <LogsTableHeader />
                <div className="flex-grow" style={{ height: 'calc(100vh - 220px)' }}>
                    <VirtualLogsList 
                        logs={filteredLogs} 
                        isMobile={isMobile} 
                        listRef={listRef} 
                        searchTerm={searchTerm} 
                    />
                </div>
            </div>
        </>
    );
};

export default LogsList;