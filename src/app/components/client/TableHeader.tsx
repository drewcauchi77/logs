"use client"

const LogsTableHeader = () => (
    <div className="w-full border-b border-slate-300 bg-slate-50">
        <div className="hidden md:flex w-full text-left">
            <div className="p-4 w-[20%] lg:w-[15%]">
                <p>Time (UTC)</p>
            </div>
            <div className="p-4 w-[15%] lg:w-[15%]">
                <p>Type</p>
            </div>
            <div className="p-4 w-[35%] lg:w-[40%]">
                <p>Message</p>
            </div>
            <div className="p-4 w-[30%]">
                <p>Source</p>
            </div>
        </div>
        <div className="flex md:hidden w-full text-left">
            <div className="p-3 w-1/2">
                <p>Time (UTC)</p>
            </div>
            <div className="p-3 w-1/2">
                <p>Type</p>
            </div>
        </div>
    </div>
);

export default LogsTableHeader;