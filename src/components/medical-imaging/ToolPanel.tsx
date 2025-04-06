// ToolPanel.tsx
import type React from "react";
import { useEffect, useState } from "react";
import { TOOL_LIST } from "../../data/toolList"; // The array we made earlier

type ToolPanelProps = {
    onSelectTool: (toolName: string) => void;
};

export const ToolPanel: React.FC<ToolPanelProps> = ({ onSelectTool }) => {
    const [active, setActive] = useState("Length"); // same default

    function handleSelect(toolName: string) {
        setActive(toolName);
        onSelectTool(toolName);
    }

    useEffect(() => {
        console.log(active, "tooling");
    }, [active]);

    return (
        <div className="flex flex-col gap-2">
            {TOOL_LIST.map((t) => (
                <button
                    type="button"
                    key={t.toolName}
                    className={t.toolName === active ? "bg-blue-500 text-white" : "bg-gray-300"}
                    onClick={() => handleSelect(t.toolName)}
                >
                    {t.label}
                </button>
            ))}
        </div>
    );
};
