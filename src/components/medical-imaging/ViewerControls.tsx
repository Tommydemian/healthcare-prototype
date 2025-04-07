import { ToolPanel } from "./ToolPanel";
import { WindowLevelControls } from "./WindowLevelControls";
import { PatientInfo } from "./PatientInfo";
import type { StackViewport } from "@cornerstonejs/core";
import type { FC } from "react";

type ViewerControlsProps = {
    setActiveTool: (toolName: string) => void;
    resetAll: () => void;
    viewportRef: React.RefObject<StackViewport | null>;
};

export const ViewerControls: FC<ViewerControlsProps> = ({ setActiveTool, resetAll, viewportRef }) => {
    return (
        <div className="grid p-2 shadow-sm xl:p-4">
            <PatientInfo />
            <ToolPanel onSelectTool={setActiveTool} resetAll={resetAll} />
            <WindowLevelControls viewportRef={viewportRef} />
        </div>
    );
};
