import { useState, useCallback } from "react";

export const useActiveImageId = () => {
    const [activeImageId, setActiveImageId] = useState("image-1");
    const handleImageSelect = useCallback((id: string) => {
        setActiveImageId(id);
    }, []);

    return {
        activeImageId,
        handleImageSelect,
    };
};
