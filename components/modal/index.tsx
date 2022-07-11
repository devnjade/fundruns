import React from "react";
import styles from "./index.module.scss";

interface ITModal {
  onClick?: () => void;
}

const TransactionModal: React.FC<ITModal> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.wrapper}>
      <div className={styles.container}>

      </div>
    </div>
  )
}

export default TransactionModal;