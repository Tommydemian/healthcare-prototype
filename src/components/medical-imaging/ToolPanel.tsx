import { Button } from "../ui/Button";
import { TOOL_LIST } from "../../data/toolList";
import type { FC } from "react";
import type { Tool } from "../../types";

type ToolPanelProps = {
    onSelectTool: (toolName: string) => void;
    resetAll: () => void;
};

export const ToolPanel: FC<ToolPanelProps> = ({ onSelectTool, resetAll }) => {
    function handleSelect(toolName: Tool["label"]) {
        if (toolName === "Pan" || toolName === "Zoom") return;
        onSelectTool(toolName);
    }

    return (
        <div className="flex flex-col gap-2 border-brder border-b pt-2">
            <h2 className="font-semibold">TOOLS</h2>
            <div className="grid grid-cols-2 gap-2">
                {TOOL_LIST.map((t) => {
                    const Icon = t.icon;
                    return (
                        <Button key={t.toolName} onClick={() => handleSelect(t.label)}>
                            <Icon size={18} className="mr-1" />
                            {t.label}
                        </Button>
                    );
                })}
            </div>
            <Button onClick={() => resetAll()}>Reset All</Button>
        </div>
    );
};
