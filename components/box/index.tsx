import React from "react";
import styles from './index.module.scss';

interface IBox {
  children?: React.ReactNode;
  customStyle?: string;
}

const Box: React.FC<IBox> = ({ children, customStyle }) => {
  return (
    <div className={`${styles.container} ${customStyle}`}>
      {children}
    </div>
  )
}

export default Box;