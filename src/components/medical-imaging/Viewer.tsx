import { ViewerCanvas } from "./ViewerCanvas";
import { ViewerFooter } from "./ViewerFooter";
// Types
import type { FC } from "react";

type ViewerProps = {
    containerRef: React.RefObject<HTMLDivElement | null>;
};
export const Viewer: FC<ViewerProps> = ({ containerRef }) => {
    return (
        <article className="relative overflow-clip rounded-lg bg-base shadow-md">
            {/* <ViewerHeader /> */}

            <div className="">
                <ViewerCanvas elementRef={containerRef} />
                <ViewerFooter />
            </div>
        </article>
    );
};
