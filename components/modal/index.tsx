import React from "react";
import { ITransactionHistory } from "utils/types";
import styles from "./index.module.scss";

interface ITModal {
  onClick?: () => void;
  data?: ITransactionHistory
}

const TransactionModal: React.FC<ITModal> = ({ onClick, data }) => {
  return (
    <div onClick={onClick} className={styles.wrapper}>
      <div onClick={(e) => e.stopPropagation()} className={styles.container}>
        <div className={styles.icon} />
        <div className={styles.desc}>
          <span>Receipent Name</span>
          <p>{data?.name}</p>
        </div>
        <div className={styles.desc}>
          <span>Amount</span>
          <p>{data?.amount}</p>
        </div>
        <div className={styles.desc}>
          <span>Reason</span>
          <p>{data?.reason}</p>
        </div>
        <div className={styles.desc}>
          <span>Transaction Reference</span>
          <p>{data?.ref}</p>
        </div>
        <button onClick={onClick}>Close</button>
      </div>
    </div>
  )
}

export default TransactionModal;