import { PanTool, ZoomTool, ProbeTool, LengthTool } from "@cornerstonejs/tools";
import { Move, ZoomIn, Ruler, Crosshair } from "lucide-react";
import type { Tool } from "../types";

export const TOOL_LIST: Tool[] = [
    {
        label: "Pan",
        toolName: PanTool.toolName,
        icon: Move,
    },
    {
        label: "Zoom",
        toolName: ZoomTool.toolName,
        icon: ZoomIn,
    },
    {
        label: "Length",
        toolName: LengthTool.toolName,
        icon: Ruler,
    },
    {
        label: "Probe",
        toolName: ProbeTool.toolName,
        icon: Crosshair,
    },
];
