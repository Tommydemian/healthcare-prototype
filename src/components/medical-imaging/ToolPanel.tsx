import { Button } from "../ui/Button";
import { TOOL_LIST } from "../../data/toolList";
import { cn } from "../../utils/cn";
import { useState, type FC } from "react";
import type { Tool } from "../../types";

type ToolPanelProps = {
    onSelectTool: (toolName: string) => void;
    resetAll: () => void;
};

export const ToolPanel: FC<ToolPanelProps> = ({ onSelectTool, resetAll }) => {
    const [activeTool, setActiveTool] = useState<Tool["label"]>("Length");
    function handleSelect(toolName: Tool["label"]) {
        if (toolName === "Pan" || toolName === "Zoom") return;
        setActiveTool(toolName);
        onSelectTool(toolName);
    }

    return (
        <div className="relative flex flex-col gap-2 border-brder border-b py-2">
            <h2 className="font-semibold">TOOLS</h2>
            <div className="mb-2 grid grid-cols-2 gap-2">
                {TOOL_LIST.map((t) => {
                    const Icon = t.icon;
                    const isPermanentTool = t.label === "Pan" || t.label === "Zoom";

                    return (
                        <div
                            key={t.toolName}
                            className="relative nth-[2]:mb-4 grid nth-[2]:hidden first:mb-4 first:hidden lg:nth-[2]:block lg:first:block"
                        >
                            <Button
                                className={cn(
                                    isPermanentTool && "cursor-default bg-gray-200 text-fg-base",
                                    t.label === activeTool && "bg-[#2a4368] ring-2 ring-white ring-opacity-70",
                                )}
                                onClick={() => handleSelect(t.label)}
                            >
                                <Icon size={18} className="mr-1" />
                                <span className="hidden xl:block">{t.label}</span>
                            </Button>
                            {isPermanentTool && (
                                <div className="-bottom-4 absolute right-0 left-0 text-center text-fg-tertiary text-xs">
                                    {t.label === "Pan" ? "Middle Click" : "Right Click"}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <Button variant="secondary" onClick={resetAll}>
                Reset All
            </Button>
        </div>
    );
};
