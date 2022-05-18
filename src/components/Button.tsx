import { ButtonHTMLAttributes } from "react";
import "../assets/css/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <button className="btn" {...props}></button>;
}
