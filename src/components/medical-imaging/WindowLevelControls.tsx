import type React from "react";

type WindowLevelControlsProps = {
    windowWidth: number;
    setWindowWidth: (val: number) => void;
    windowCenter: number;
    setWindowCenter: (val: number) => void;
};

export const WindowLevelControls: React.FC<WindowLevelControlsProps> = ({
    windowWidth,
    setWindowWidth,
    windowCenter,
    setWindowCenter,
}) => {
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
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary-hover"
                />
            </div>

            <div className="mb-4">
                <div className="mb-1 flex items-center justify-between">
                    <label htmlFor="center" className="font-medium text-gray-600 text-sm">
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
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary-hover"
                />
            </div>
        </div>
    );
};
