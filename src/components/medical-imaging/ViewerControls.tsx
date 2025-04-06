import type { FC } from "react";
import { ToolPanel } from "./ToolPanel";
import { WindowLevelControls } from "./WindowLevelControls";
import { PatientInfo } from "./PatientInfo";

type ViewerControlsProps = {
    windowWidth: number;
    setWindowWidth: (val: number) => void;
    windowCenter: number;
    setWindowCenter: (val: number) => void;
    setActiveTool: (toolName: string) => void;
    resetAll: () => void;
};

export const ViewerControls: FC<ViewerControlsProps> = ({
    setWindowCenter,
    setWindowWidth,
    windowCenter,
    windowWidth,
    setActiveTool,
    resetAll,
}) => {
    return (
        <div className="grid p-4 shadow-sm">
            <PatientInfo />
            <ToolPanel onSelectTool={setActiveTool} resetAll={resetAll} />
            <WindowLevelControls
                windowWidth={windowWidth}
                setWindowWidth={setWindowWidth}
                windowCenter={windowCenter}
                setWindowCenter={setWindowCenter}
            />
        </div>
    );
};
