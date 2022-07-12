import React from "react";
import { ITransactionHistory } from "utils/types";
import styles from "./index.module.scss";

interface ITransactionBox {
  onClick?: () => void;
  data?: ITransactionHistory;
}

const TransactionBox: React.FC<ITransactionBox> = ({ onClick, data }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.left}>
        <div className={styles.type} />
        <div className={styles.details}>
          <p>{data?.name}</p>
          <span>{data?.ref}</span>
        </div>
      </div>
      <p className={styles.price}>₦{data?.amount}</p>
    </div>
  )
}

export default TransactionBox;