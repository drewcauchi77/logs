"use client"

import { AutoSizerProps, VirtualLogsListProps } from "@/app/types/definitions";
import { FixedSizeList as List } from 'react-window';
import LogRow from "./LogRow";
import AutoSizer from "react-virtualized-auto-sizer";

const VirtualLogsList = ({ logs, isMobile, listRef, searchTerm }: VirtualLogsListProps) => {
    const VirtualRow = ({ index, style }: { index: number, style: React.CSSProperties }) => {
        const log = logs[index];
        return (
            <div style={style}>
                <LogRow log={log} searchTerm={searchTerm} />
            </div>
        );
    };

    if (logs.length === 0) {
        return (
            <div className="flex items-center justify-center h-full p-6 text-slate-500">
                No logs matching your filter criteria
            </div>
        );
    }

    return (
        <AutoSizer>
            {({ height, width }: AutoSizerProps) => (
                <List
                    ref={listRef}
                    height={height}
                    itemCount={logs.length}
                    itemSize={isMobile ? 120 : 57}
                    width={width}
                    className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                    overscanCount={5}
                >
                    {VirtualRow}
                </List>
            )}
        </AutoSizer>
    );
};

export default VirtualLogsList;