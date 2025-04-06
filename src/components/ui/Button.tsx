import type { FC, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
};

export const Button: FC<ButtonProps> = ({ onClick, variant = "primary", type = "button", children, ...rest }) => {
    return (
        <button type={type} onClick={onClick} className={`button ${variant}`} {...rest}>
            {children}
        </button>
    );
};
