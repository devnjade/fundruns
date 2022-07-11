import React from "react";
import styles from "./index.module.scss";

interface ITModal {
  onClick?: () => void;
  data?: any
}

const TransactionModal: React.FC<ITModal> = ({ onClick, data }) => {
  return (
    <div onClick={onClick} className={styles.wrapper}>
      <div onClick={(e) => e.stopPropagation()} className={styles.container}>
        <div className={styles.icon} />
        <div className={styles.desc}>
          <span>Name</span>
          <p>Value</p>
        </div>
        <div className={styles.desc}>
          <span>Name</span>
          <p>Value</p>
        </div>
        <div className={styles.desc}>
          <span>Name</span>
          <p>Value</p>
        </div>
        <div className={styles.desc}>
          <span>Name</span>
          <p>Value</p>
        </div>
        <div className={styles.desc}>
          <span>Name</span>
          <p>Value</p>
        </div>
        <div className={styles.desc}>
          <span>Name</span>
          <p>Value</p>
        </div>
        <button onClick={onClick}>Close</button>
      </div>
    </div>
  )
}

export default TransactionModal;