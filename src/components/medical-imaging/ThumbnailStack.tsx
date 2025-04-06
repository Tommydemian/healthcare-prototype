import type { FC } from "react";
import { cn } from "../../utils/cn";

type ThumbnailStackProps = {
    thumbnails: {
        id: string;
        label: string;
        description: string;
    }[];
    onSelect: (id: string) => void;
    activeId?: string;
};

export const ThumbnailStack: FC<ThumbnailStackProps> = ({ thumbnails, onSelect, activeId }) => {
    return (
        <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
            {thumbnails.map((thumb) => (
                <div
                    key={thumb.id}
                    onKeyDown={() => onSelect(thumb.id)}
                    onClick={() => onSelect(thumb.id)}
                    className={cn(
                        "relative h-24 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2",
                        activeId === thumb.id ? "border-primary" : "border-brder",
                    )}
                >
                    <img
                        src={`/api/dicom-thumbnail/${thumb.id}`}
                        alt={thumb.label}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute right-0 bottom-0 left-0 bg-black bg-opacity-70 p-1">
                        <div className="font-medium text-fg-inverted text-xs">{thumb.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
