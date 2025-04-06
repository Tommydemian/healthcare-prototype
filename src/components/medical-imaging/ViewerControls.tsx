import { ZoomOutIcon, Fullscreen } from "lucide-react";
import { Button } from "../ui/Button";
import type { FC } from "react";

type ViewerControlsProps = {
    resetWindowLevel: () => void;
    zoomOut: () => void;
};

export const ViewerControls: FC<ViewerControlsProps> = ({ resetWindowLevel, zoomOut }) => {
    const leyendList = ["Left Click: Adjust Contrast/ Window", "Right Click: Zoom", "Scroll: Pan"];
    return (
        <div className="mt-4 rounded-md border border-brder bg-white p-3 shadow-sm">
            <div className="grid grid-cols-[1fr] items-center justify-between md:flex">
                <div className="grid gap-2 md:flex">
                    <Button onClick={resetWindowLevel}>
                        <Fullscreen className="mr-2 h-4 w-4" /> Reset Window Level
                    </Button>
                    <Button onClick={zoomOut}>
                        <ZoomOutIcon className="mr-2 h-4 w-4" /> Zoom Out
                    </Button>
                </div>

                <div className="mt-2 flex flex-wrap items-center text-sm">
                    <ul className="list-none">
                        {leyendList.map((leyend) => (
                            <li key={leyend} className="mr-4 flex items-center">
                                <span className="mr-1 h-2 w-2 rounded-full bg-[#ADADAD] shadow-2xl" />
                                <p>{leyend}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
