import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  text,
  children,
  className = "",
  ...props
}) => {
  return <button className={className} {...props}>{children ?? text}</button>;
};

export default Button;
