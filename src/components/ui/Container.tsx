import { cn } from "../../utils/cn";
import type { FC, ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
    className?: string;
};

export const Container: FC<ContainerProps> = ({ className, children }) => {
    return <div className={cn("mx-auto box-content max-w-[80rem] px-4", className)}>{children}</div>;
};
