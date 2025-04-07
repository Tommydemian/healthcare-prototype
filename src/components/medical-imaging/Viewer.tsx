import { ViewerCanvas } from "./ViewerCanvas";
import { ViewerFooter } from "./ViewerFooter";
import type { FC } from "react";

type ViewerProps = {
    containerRef: React.RefObject<HTMLDivElement | null>;
    isLoading: boolean;
};
export const Viewer: FC<ViewerProps> = ({ containerRef, isLoading }) => {
    return (
        <div className="relative overflow-clip rounded-lg shadow-md">
            <div className="">
                <ViewerCanvas isLoading={isLoading} elementRef={containerRef} />
                <ViewerFooter />
            </div>
        </div>
    );
};
