import React from "react";
import styles from "./index.module.scss";

interface ITransactionBox {
  onClick?: () => void;
  data?: any;
}

const TransactionBox: React.FC<ITransactionBox> = ({ onClick, data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.type} />
        <div className={styles.details}>
          <p>Bank Transfer</p>
          <span>Ref: weinvlw1234</span>
        </div>
      </div>
      <p className={styles.price}>₦500</p>
    </div>
  )
}

export default TransactionBox;