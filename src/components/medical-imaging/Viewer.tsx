import { ViewerCanvas } from "./ViewerCanvas";
import { ViewerFooter } from "./ViewerFooter";
import type { FC } from "react";

type ViewerProps = {
    containerRef: React.RefObject<HTMLDivElement | null>;
};
export const Viewer: FC<ViewerProps> = ({ containerRef }) => {
    return (
        <div className="relative overflow-clip rounded-lg shadow-md">
            <div className="">
                <ViewerCanvas elementRef={containerRef} />
                <ViewerFooter />
            </div>
        </div>
    );
};
