import type { FC } from "react";

type ViewerCanvasProps = {
    elementRef: React.RefObject<HTMLDivElement | null>;
};

export const ViewerCanvas: FC<ViewerCanvasProps> = ({ elementRef }) => {
    return (
        <div className="relative overflow-clip rounded-md border border-brder bg-[#0A0A0A]">
            <div ref={elementRef} className="mx-auto aspect-auto h-[530px] w-[530px] rounded-[5rem]" />
            <div className="absolute bottom-2 left-2 rounded bg-black bg-opacity-60 p-1 text-white text-xs">
                CT Scan • Axial View • 3mm Slice
            </div>
        </div>
    );
};
