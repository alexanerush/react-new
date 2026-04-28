import React from "react";

const Tooltip = ({ children, text }) => {
  return (
    <span className="tooltip-wrapper">
      {children}
      <span className="tooltip-text">{text}</span>
    </span>
  );
};

export default Tooltip;
