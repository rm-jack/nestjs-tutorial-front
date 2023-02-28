import React from "react";

export interface Props {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick?: () => void;
  radius: string;
  width: string;
}

function Button({
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
}: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        height,
        width,
      }}
    >
      {children}
    </button>
  );
}


export default Button 