import React from "react";

const Button = ({ text, children, onClick, className = "", ...props }) => {
  return (
    <button className={className} onClick={onClick} {...props}>
      {children || text}
    </button>
  );
};

export default Button;

  
