import React, { ReactNode } from 'react';
import "./Container.scss";

export const Container: React.FC<{fluid?: boolean, className?: string, children?: ReactNode}> = (props) => {
  const { fluid, className = "", children } = props;

  return (
    <div className={`custom-container ${fluid ? "custom-container--fluid" : ""} ${className}`}>
      {children}
    </div>
  )
}
