import type { FC } from "react";
import { ViewerCanvas } from "./ViewerCanvas";
import { ViewerFooter } from "./ViewerFooter";
// Hooks
import { useCornerStore } from "./hooks/useCornerStone";
import type { StackViewport } from "@cornerstonejs/core";

type ViewerProps = {
    activeImageId: string;
    viewportRef: React.RefObject<StackViewport | null>;
};
export const Viewer: FC<ViewerProps> = ({ activeImageId, viewportRef }) => {
    const { elementRef } = useCornerStore({ viewportRef, imageId: activeImageId });

    return (
        <article className="overflow-clip rounded-lg bg-base shadow-md">
            {/* <ViewerHeader /> */}

            <div className="p-4">
                <ViewerCanvas elementRef={elementRef} />
                <ViewerFooter />
            </div>
        </article>
    );
};
