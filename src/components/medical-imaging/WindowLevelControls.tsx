import { useWindowLevelControls } from "./hooks/useWindowLevelControls";
import type { FC } from "react";
import type { StackViewport } from "@cornerstonejs/core";

type WindowLevelControlsProps = {
    viewportRef: React.RefObject<StackViewport | null>;
};
export const WindowLevelControls: FC<WindowLevelControlsProps> = ({ viewportRef }) => {
    const { setWindowCenter, setWindowWidth, windowCenter, windowWidth } = useWindowLevelControls({ viewportRef });
    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWindowWidth(Number(e.target.value));
    };

    const handleCenterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWindowCenter(Number(e.target.value));
    };

    return (
        <div className="space-y-3 pt-2">
            <h3 className="font-semibold text-md uppercase">Window / Level</h3>

            <div className="mb-4">
                <div className="mb-1 flex items-center justify-between">
                    <label htmlFor="width" className="font-medium text-sm">
                        Width
                    </label>
                    <span className="rounded bg-gray-200 px-2 py-1 font-medium text-xs">{windowWidth}</span>
                </div>
                <input
                    id="width"
                    type="range"
                    min="1"
                    max="2000"
                    step="1"
                    value={windowWidth}
                    onChange={handleWidthChange}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-primary-hover"
                />
            </div>

            <div className="mb-4">
                <div className="mb-1 flex items-center justify-between">
                    <label htmlFor="center" className="font-medium text-sm">
                        Center
                    </label>
                    <span className="rounded bg-gray-200 px-2 py-1 font-medium text-xs">{windowCenter}</span>
                </div>
                <input
                    id="center"
                    type="range"
                    min="-500"
                    max="500"
                    step="1"
                    value={windowCenter}
                    onChange={handleCenterChange}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-primary-hover"
                />
            </div>
        </div>
    );
};
