"use client"
import { useMemo, useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from "react";
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import LogRow from "./LogRow";
import { AutoSizerProps, type LogEntry, LogsListProps } from "@/app/types/definitions";
import { dateInUtc, capitaliseText, getColorsByLevel } from "@/app/helpers/helpers";

const LogsList: React.FC<LogsListProps> = ({ logs }: LogsListProps) => {
    const [levels, setLevels] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<List | null>(null);
    const ROW_HEIGHT = 57;

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
        if (listRef.current) {
            listRef.current.scrollToItem(0);
        }
    }, [searchTerm, selectedLevels]);

    const toggleLevel = (level: string): void => {
        if (selectedLevels.includes(level)) {
            setSelectedLevels(selectedLevels.filter((l: string) => l !== level));
        } else {
            setSelectedLevels([...selectedLevels, level]);
        }
    };

    const VirtualRow = ({ index, style }: { index: number, style: React.CSSProperties }) => {
        const log = filteredLogs[index];

        return (
            <div style={style}>
                <LogRow log={log} searchTerm={searchTerm} />
            </div>
        );
    };

    return (
        <>
            <div className="mb-4 flex flex-col md:flex-row md:items-start gap-4 fixed top-0 z-10 w-full left-0 py-5 px-8 bg-white">
                <div className="relative flex-grow">
                    <input 
                        type="text"
                        className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                        placeholder="Search logs..." 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target?.value ?? '')}
                    />
                    <button 
                        className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded" 
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-slate-600">
                            <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                <div className="w-full md:w-1/3 lg:w-1/4 relative" ref={dropdownRef}>
                    <div className="bg-white max-h-[40px] pl-3 py-2 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease cursor-pointer hover:border-slate-400 shadow-sm flex flex-wrap items-center gap-1"
                        onClick={() => setDropdownOpen(!dropdownOpen)}>
                        {selectedLevels.length === 0 ? (
                            <span className="text-slate-400">Select Type(s)</span>
                        ) : (
                            <>
                                {selectedLevels.map((level: string) => (
                                    <div 
                                        key={level} 
                                        className={`flex items-center px-2 rounded-full border ${getColorsByLevel(level).backgroundColor} ${getColorsByLevel(level).borderColor} ${getColorsByLevel(level).textColor}`}
                                        onClick={(e: ReactMouseEvent) => {
                                            e.stopPropagation();
                                            toggleLevel(level);
                                        }}
                                    >
                                        <span className="mr-1">{capitaliseText(level)}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                ))}
                            </>
                        )}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    
                    {dropdownOpen && (
                        <div className="absolute w-full mt-1 bg-white border border-slate-200 rounded shadow-md z-10 max-h-[200px] overflow-y-auto">
                            {levels.map((level: string) => (
                                <div 
                                    key={level}
                                    className={`px-3 py-2 cursor-pointer hover:bg-slate-100 ${selectedLevels.includes(level) ? 'bg-slate-50' : ''}`}
                                    onClick={() => toggleLevel(level)}
                                >
                                    <div className="flex items-center">
                                        <div className={`w-4 h-4 mr-2 flex items-center justify-center border rounded ${selectedLevels.includes(level) ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
                                            {selectedLevels.includes(level) && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        {capitaliseText(level)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border mt-24 md:mt-12">
                <div className="w-full border-b border-slate-300 bg-slate-50">
                    <div className="flex w-full text-left">
                        <div className="p-4 w-[15%]">
                            <p>Time (UTC)</p>
                        </div>
                        <div className="p-4 w-[15%]">
                            <p>Type</p>
                        </div>
                        <div className="p-4 w-[40%]">
                            <p>Message</p>
                        </div>
                        <div className="p-4 w-[30%]">
                            <p>Source</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex-grow" style={{ height: 'calc(100vh - 220px)' }}>
                    {filteredLogs.length > 0 ? (
                        <AutoSizer>
                            {({ height, width }: AutoSizerProps) => (
                                <List
                                    ref={listRef}
                                    height={height}
                                    itemCount={filteredLogs.length}
                                    itemSize={ROW_HEIGHT}
                                    width={width}
                                    className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                                    overscanCount={5}
                                >
                                    {VirtualRow}
                                </List>
                            )}
                        </AutoSizer>
                    ) : (
                        <div className="flex items-center justify-center h-full p-6 text-slate-500">
                            No logs matching your filter criteria
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default LogsList;