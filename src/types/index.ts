import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export type LucideProps = SVGProps<SVGSVGElement> & {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
};

export type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;

type AvailableTools = "Pan" | "Zoom" | "Length" | "Probe";
export type Tool = {
    label: AvailableTools;
    toolName: string;
    icon: LucideIcon;
};
