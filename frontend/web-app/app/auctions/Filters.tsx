import { useParamsStore } from "@/hooks/useParamStore";
import { Dropdown, DropdownItem } from "flowbite-react";

import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsFillStopCircleFill, BsStopwatchFill } from "react-icons/bs";
import { GiFinishLine, GiFlame } from "react-icons/gi";

const pageSizeButtons = [4, 8, 12];
const orderButtons = [
    { label: "Alphabetical", icon: AiOutlineSortAscending, value: "make" },
    { label: "End date", icon: AiOutlineClockCircle, value: "endingSoon" },
    { label: "Recently added", icon: BsFillStopCircleFill, value: "new" },
];

const filterButtons = [
    { label: "Live auctions", icon: GiFlame, value: "live" },
    { label: "Ending < 6 hours", icon: GiFinishLine, value: "endingSoon" },
    { label: "Completed", icon: BsStopwatchFill, value: "finished" },
];

export default function Filters() {
    const pageSize = useParamsStore((state) => state.pageSize);
    const setParams = useParamsStore((state) => state.setParams);
    const orderBy = useParamsStore((state) => state.orderBy);
    const filterBy = useParamsStore((state) => state.filterBy);

    return (
        <div className="container mx-auto">
<div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            {/* Filter By */}
            <div className="flex items-center gap-2">
                <span className="uppercase text-sm text-gray-500">Filter by</span>
                <Dropdown label={filterButtons.find(f => f.value === filterBy)?.label || "Select"} color="gray">
                    {filterButtons.map(({ label, icon: Icon, value }) => (
                        <DropdownItem
                            key={value}
                            onClick={() => setParams({ filterBy: value })}
                            className={`${filterBy === value ? "bg-red-500 text-red-600" : ""}`}
                        >
                            <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {label}
                            </div>
                        </DropdownItem>
                    ))}
                </Dropdown>
            </div>

            {/* Order By */}
            <div className="flex items-center gap-2">
                <span className="uppercase text-sm text-gray-500">Order by</span>
                <Dropdown label={orderButtons.find(o => o.value === orderBy)?.label || "Select"} color="gray">
                    {orderButtons.map(({ label, icon: Icon, value }) => (
                        <DropdownItem
                            key={value}
                            onClick={() => setParams({ orderBy: value })}
                            className={`${orderBy === value ? "bg-red-500 text-red-600" : ""}`}
                        >
                            <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {label}
                            </div>
                        </DropdownItem>
                    ))}
                </Dropdown>
            </div>

                {/* Page Size */}
                <div className="flex items-center  gap-2">
                    <span className="uppercase text-sm text-gray-500">Page size</span>
                    <Dropdown label={pageSize || "Select"} color="gray">
                        {pageSizeButtons.map((value, index) => (
                            <DropdownItem
                                key={index}
                                onClick={() => setParams({ pageSize: value })}
                                className={`${pageSize === value ? "bg-red-500 text-red-600" : ""}`}
                            >
                                {value}
                            </DropdownItem>
                        ))}
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}
