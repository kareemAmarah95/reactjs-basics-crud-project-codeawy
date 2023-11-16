import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
}


const Input = ({ ...rest }: IProps) => {
    return (
        <input className="border-2 border-gray-300" {...rest} />
    )
}

export default Input;