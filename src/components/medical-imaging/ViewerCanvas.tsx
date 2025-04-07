import { useEffect, type FC } from "react";

type ViewerCanvasProps = {
    elementRef: React.RefObject<HTMLDivElement | null>;
    isLoading: boolean;
};

export const ViewerCanvas: FC<ViewerCanvasProps> = ({ elementRef, isLoading }) => {
    useEffect(() => {
        console.log(isLoading, "loading");
    }, [isLoading]);
    return (
        <div className="relative overflow-clip rounded-md border border-brder bg-[#0A0A0A]">
            <div
                ref={elementRef}
                className="mx-auto aspect-auto h-[320px] w-[90vw] rounded-[5rem] md:h-[530px] md:w-[530px] min-[400px]:h-[350px] min-[450px]:w-[450px]"
            />
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
                    <div className="flex flex-col items-center">
                        <div className="loader mb-2" />
                        <p className="text-fg-inverted text-sm">Loading DICOM...</p>
                    </div>
                </div>
            )}
            <div className="absolute bottom-2 left-2 rounded bg-black bg-opacity-60 p-1 text-white text-xs">
                CT Scan • Axial View • 3mm Slice
            </div>
        </div>
    );
};
