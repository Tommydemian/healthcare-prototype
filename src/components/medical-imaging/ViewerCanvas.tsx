import type { FC } from "react";

type ViewerCanvasProps = {
    elementRef: React.RefObject<HTMLDivElement | null>;
};

export const ViewerCanvas: FC<ViewerCanvasProps> = ({ elementRef }) => {
    return (
        <div className="relative overflow-hidden rounded-md border border-brder bg-black">
            <div ref={elementRef} className="mx-auto aspect-square max-h-[512px] w-full max-w-[412px] md:aspect-2/4" />
            <div className="absolute bottom-2 left-2 rounded bg-black bg-opacity-60 p-1 text-white text-xs">
                CT Scan • Axial View • 3mm Slice
            </div>
        </div>
    );
};
