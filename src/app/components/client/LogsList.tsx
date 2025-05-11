"use client"
import { useMemo, useState } from "react";
import LogRow from "./LogRow";
import { type LogEntry, LogsListProps } from "@/app/types/definitions";
import { dateInUtc, capitaliseText } from "@/app/helpers/helpers";

const LogsList = ({ logs }: LogsListProps) => {
    const [levels, setLevels] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

    const parsedLogs: LogEntry[] = useMemo(
        () => 
            logs.map((entry) => {
                const [ts, msg, level, source, id] = entry.split("|=|");

                const date = new Date(ts);
                const dateTime = dateInUtc(date);

                if (!levels.includes(level.toLowerCase())) {
                    setLevels([...levels, level.toLowerCase()]);
                }

                return { dateTime, msg, level, source, id };
            }).sort((a, b) => Date.parse(b.dateTime) - Date.parse(a.dateTime)),
        [logs, levels]
    );

    const filteredLogs: LogEntry[] = useMemo(() => {
        const term = searchTerm.toLowerCase();

        return parsedLogs.filter((log) => {
            const textMatch = log.msg.toLowerCase().includes(term) || log.source.toLowerCase().includes(term);
            const levelMatch = selectedLevels.length === 0 || selectedLevels.includes(log.level.toLowerCase());

            return textMatch && levelMatch;
        })
    }, [parsedLogs, searchTerm, selectedLevels]);

    return (
        <>
            <div className="mb-4 flex flex-col md:flex-row md:items-start gap-4">
                <div className="relative flex-grow">
                    <input type="text"
                        className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                        placeholder="Search logs..." onChange={(e) => setSearchTerm(e?.target?.value ?? '')}
                    />
                    <button className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-slate-600">
                            <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                <div className="w-full md:w-1/3 lg:w-1/4">
                    <div className="relative">
                        <select multiple value={selectedLevels}
                            className="bg-white w-full min-h-[100px] pl-3 py-2 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                const values = Array.from(
                                    e.target.selectedOptions,
                                    (opt) => opt.value
                                );

                                setSelectedLevels(values);
                            }}>
                            <option disabled value="" className="text-slate-400">Select Type(s):</option>
                            {levels.map((level, index) => {
                                return (
                                    <option key={index} value={level.toLowerCase()} className="p-1">{capitaliseText(level)}</option>
                                )
                            })}
                        </select>
                        <div className="text-xs text-slate-500 mt-1">Hold Ctrl/Cmd to select multiple</div>
                    </div>
                </div>
            </div>
            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p>Time (UTC)</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p>Type</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p>Message</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-slate-50">
                                <p>Source</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.map((entry) => {
                            return (
                                <LogRow log={entry} key={entry.id} searchTerm={searchTerm}></LogRow>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default LogsList;