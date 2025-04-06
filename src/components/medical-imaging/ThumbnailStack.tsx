import type { FC } from "react";
import { cn } from "../../utils/cn";

type ThumbnailStackProps = {
    thumbnails: {
        id: string;
        label: string;
        description: string;
        src: string;
    }[];
    onSelect: (id: string) => void;
    activeId?: string;
};

export const ThumbnailStack: FC<ThumbnailStackProps> = ({ thumbnails, onSelect, activeId }) => {
    return (
        <div className="flex flex-col items-center justify-between gap-2">
            {thumbnails.map((thumb) => (
                <div
                    key={thumb.id}
                    onKeyDown={() => onSelect(thumb.id)}
                    onClick={() => onSelect(thumb.id)}
                    className={cn(
                        "relative flex-shrink-0 cursor-pointer overflow-hidden rounded-md transition-all duration-150",
                        activeId === thumb.id
                            ? "border border-white ring-2 ring-[#365681]"
                            : "border border-brder hover:border-[#365681]/30",
                    )}
                    tabIndex={0}
                    // biome-ignore lint/a11y/useSemanticElements: <explanation>
                    role="button"
                    aria-pressed={activeId === thumb.id}
                >
                    <img src={thumb.src} alt={thumb.label} className="h-full w-full object-contain" />
                    <div className="absolute right-0 bottom-0 left-0 bg-black bg-opacity-60 p-1">
                        <div className="flex gap-4 font-medium text-fg-inverted text-xs">
                            <p>
                                {thumb.label} {"-"}{" "}
                                <span className="text-fg-inverted text-xs opacity-80">{thumb.description}</span>
                            </p>

                            {activeId === thumb.id && <span className="text-[#7bb5d9]">●</span>}
                        </div>
                    </div>
                    {activeId === thumb.id && (
                        <div className="absolute inset-0 animate-pulse border border-[#365681]/60" />
                    )}
                </div>
            ))}
        </div>
    );
};
