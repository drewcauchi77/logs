"use client";
import React from "react";
import { LogRowProps, LevelColor, LogEntry } from "@/app/types/definitions";
import { useHighlightedText } from "@/app/hooks/useHighlightedText";
import { capitaliseText } from "@/app/helpers/helpers";
import { useLevelColour } from "@/app/hooks/useLevelColour";

const LogRow: React.FC<LogRowProps> = ({ log, searchTerm = '' }: LogRowProps) => {
    const { dateTime, level, msg, source }: LogEntry = log;

    const levelColour: LevelColor = useLevelColour(level);
    const highlightedMsg: string = useHighlightedText(msg, searchTerm);
    const highlightedSource: string = useHighlightedText(source, searchTerm);

    return (
        <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200">
                <p className="block text-sm text-slate-800">{dateTime}</p>
            </td>
            <td className="p-4 border-b border-slate-200">
                <p className="block text-sm text-slate-800">
                    <span className={`w-2 h-2 ${levelColour.backgroundColor} inline-block mr-2 rounded-full border-1 border-solid ${levelColour.borderColor}`}></span>
                    <strong>{capitaliseText(level)}</strong>
                </p>
            </td>
            <td className="p-4 border-b border-slate-200">
                <p 
                    className="block text-sm text-slate-800" 
                    dangerouslySetInnerHTML={{ __html: highlightedMsg }}
                />
            </td>
            <td className="p-4 border-b border-slate-200">
                <p 
                    className="block text-sm text-slate-800" 
                    dangerouslySetInnerHTML={{ __html: highlightedSource }}
                />
            </td>
        </tr>
    );
};

export default LogRow;