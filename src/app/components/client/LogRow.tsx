"use client";
import { LogRowProps } from "@/app/types/definitions";
import { useHighlightedText } from "@/app/hooks/useHighlightedText";
import { capitaliseText } from "@/app/helpers/helpers";
import { useLevelColour } from "@/app/hooks/useLevelColour";

const LogRow = ({ log, searchTerm }: LogRowProps) => {
    const { dateTime, level, msg, source } = log;

    const levelColour = useLevelColour(level);
    const highlightedMsg = useHighlightedText(msg, searchTerm);
    const highlightedSource = useHighlightedText(source, searchTerm);

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
                <p className="block text-sm text-slate-800" dangerouslySetInnerHTML={{ __html: highlightedMsg }}></p>
            </td>
            <td className="p-4 border-b border-slate-200">
                <p className="block text-sm text-slate-800" dangerouslySetInnerHTML={{ __html: highlightedSource }}></p>
            </td>
        </tr>
    );
};

export default LogRow;