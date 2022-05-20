import { ButtonHTMLAttributes } from "react";
import "../assets/css/button.scss";

// passando dois objetos como props
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button
      className={`btn ${isOutlined ? "outlined" : ""}`}
      {...props}
    ></button>
  );
}
