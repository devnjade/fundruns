import axios from "axios";
import { Box, TransactionBox, TransactionModal } from "components";
import React from "react";
import { getBanks, verifyAccount } from "utils/requests";
import { IBanks } from "utils/types";
import styles from './index.module.scss';

const HomeView: React.FC = () => {
  const [accountNumber, setAccountNumber] = React.useState<string>('');

  const [amount, setAmount] = React.useState<number>(0);
  const [setAmountError, setSetAmountError] = React.useState<string | null>(null);

  const [description, setDescription] = React.useState<string>('');

  const [showTransactionModal, setShowTransactionModal] = React.useState<boolean>(false);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>({});


  const [bankCode, setBankCode] = React.useState<number | null>(null);
  const [banks, setBanks] = React.useState<IBanks>();
  const [verifiedAccountName, setVerifiedAccountName] = React.useState<string | null>('');

  const toggleTransactionModal = (data?: any) => {
    setShowTransactionModal(!showTransactionModal);
    setModalData(data);
  }

  const bankRequest = async () => {
    const res = await getBanks();
    setBanks(res);
  }

  React.useEffect(() => {
    bankRequest();
  }, []);

  const verifyAccRequest = async () => {
    const res = await verifyAccount(accountNumber, bankCode);
    console.log(res);
  }

  React.useEffect(() => {
    if (accountNumber.length === 10) {
      verifyAccRequest();
    }
  }, [accountNumber, bankCode]);

  React.useEffect(() => {
    if (bankCode && accountNumber && amount && verifiedAccountName) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [accountNumber, amount, bankCode, verifiedAccountName]);

  const convertKoboToNaira = (i: number) => {
    return (i / 100).toFixed(2);
  }

  const validateAmount = () => {
    if (amount < 100 || amount > 10000000){
      setSetAmountError('Amount Must Not Be Less Than 100 / Max Amount Allowed Is 10,000,000');
      return false;
    } else{
      setSetAmountError(null);
      return true;
    }
  }
      
  const transferFunds = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const validationRes = validateAmount();
    console.log(validationRes);
    if (validationRes === true) {
      const transferData = {
        account_bank: bankCode,
        account_number: accountNumber,
        amount,
        narration: description,
        currency: 'NGN',
        reference: `FRUNS-${Date.now()}-${Math.floor(Math.random() * 100)}`,
        callback_url: '',
        debit_currency: 'NGN',
      }

      console.log(transferData);
    } else {
      console.log('error occured');
    }
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
                onChange={(e) => setBankCode(Number(e.target.value))}
              >
                <option hidden value=''>-- Select Bank --</option>
                {banks?.map((bank: any) => (
                  <option key={bank.id} value={bank.code}>{bank.name}</option>
                ))}
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
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                }}
                placeholder="0.00"
              />
              {setAmountError && <span>{setAmountError}</span>}
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