import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
    color: string;
    onClick: () => void;
}


const CircleColor = ({ color, onClick, ...rest }: IProps) => {
    return (
        <span className={`block w-5 h-5 rounded-full cursor-pointer mb-2 ml-2`}
            style={{ backgroundColor: color }}
            onClick={onClick}
            {...rest}
        />

    )
}

export default CircleColor;