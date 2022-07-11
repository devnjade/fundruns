import { Box, TransactionBox, TransactionModal } from "components";
import React from "react";
import { getBanks } from "utils/requests";
import styles from './index.module.scss';

const HomeView: React.FC = () => {
  const [bank, setBank] = React.useState<string>('');
  const [accountNumber, setAccountNumber] = React.useState<string>('');
  const [amount, setAmount] = React.useState<number>(0);
  const [verifiedAccountName, setVerifiedAccountName] = React.useState<string | null>('');
  const [description, setDescription] = React.useState<string>('');
  const [showTransactionModal, setShowTransactionModal] = React.useState<boolean>(false);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>({});

  const toggleTransactionModal = (data?: any) => {
    setShowTransactionModal(!showTransactionModal);
    setModalData(data);
  }

  console.log(showTransactionModal)

  const bankRequest = async () => {
    const banks = await getBanks();
    console.log(banks);
  }

  // React.useEffect(() => {
  //   bankRequest();
  // }, []);

  React.useEffect(() => {
    if (bank && accountNumber && amount) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [accountNumber, amount, bank, verifiedAccountName]);

  React.useEffect(() => {
    if (amount < 100){
      console.log('Amount Must Not Be Less Than 100');
      setDisabled(true);
    }
    if (amount > 10000000){
      console.log('Max Amount Allowed Is 10,000,000');
      setDisabled(true);
    }
  }, [amount]);
      
  const transferFunds = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const transferData = {
      account_bank: bank,
      account_number: accountNumber,
      amount,
      narration: description,
      currency: 'NGN',
      reference: `FRUNS-${Date.now()}-${Math.floor(Math.random() * 100)}`,
      callback_url: '',
      debit_currency: 'NGN',
    }

    console.log(transferData);
  }

  console.log(showTransactionModal)

  return (
    <>
      {showTransactionModal && (
        <TransactionModal 
          onClick={toggleTransactionModal} 
          data={modalData}
        />
      )}
      <main className={styles.wrapper}>
        <form onSubmit={transferFunds} className={styles.left}>
          <Box>
            <div className={styles.ttop}>
              <p>Transfer Funds</p>
              <span>send money from your account to other banks.</span>
            </div>
            <hr />
            <div className={styles.option}>
              <label>Select Bank</label>
              <select 
                onChange={(e) => setBank(e.target.value)}
              >
                <option hidden value=''>-- Select Bank --</option>
                <option>bank</option>
              </select>
            </div>
            <div className={styles.option}>
              <label>Account Number</label>
              <input 
                type="text"
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Account Number"
              />
              {verifiedAccountName && <span>{verifiedAccountName}</span>}
            </div>
            <div className={styles.option}>
              <label>Amount</label>
              <input 
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="0.00"
              />
            </div>
            <div className={styles.option}>
              <label>Description</label>
              <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="payment description (optional)"
              />
            </div>
            <button  disabled={disabled === true}>Transfer</button>
          </Box>
        </form>
        <div className={styles.right}>
          <Box>
            <p className={styles.title}>Recent Transactions</p>
            <TransactionBox 
              onClick={toggleTransactionModal}
            />
          </Box>
        </div>
      </main>
    </>
  )
}

export default HomeView;