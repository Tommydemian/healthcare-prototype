// toolList.ts
import { PanTool, ZoomTool, ProbeTool, LengthTool } from "@cornerstonejs/tools";

export const TOOL_LIST = [
    {
        label: "Pan", // Display name in your UI
        toolName: PanTool.toolName, // "Pan"
    },
    {
        label: "Zoom",
        toolName: ZoomTool.toolName, // "Zoom"
    },
    {
        label: "Length",
        toolName: LengthTool.toolName, // "Length"
    },
    {
        label: "Probe",
        toolName: ProbeTool.toolName, // "Probe"
    },
];
