import type { FC, ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
    className?: string;
};

export const Button: FC<ButtonProps> = ({
    onClick,
    variant = "primary",
    className,
    type = "button",
    children,
    ...rest
}) => {
    return (
        <button type={type} onClick={onClick} className={cn("button", variant, className)} {...rest}>
            {children}
        </button>
    );
};
