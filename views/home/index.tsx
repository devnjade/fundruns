import { Box, TransactionBox, TransactionModal } from "components";
import { data } from "mock/transaction";
import React from "react";
import { toast } from "react-toastify";
import { getBanks, initTransfer, transferRecp, verifyAccount } from "utils/requests";
import { IBanks, ITransactionHistory } from "utils/types";
import styles from './index.module.scss';

const HomeView: React.FC = () => {
  // form states
  const [accountNumber, setAccountNumber] = React.useState<string>('');
  const [bankCode, setBankCode] = React.useState<number | null>(null);
  const [amount, setAmount] = React.useState<number>(0);
  const [description, setDescription] = React.useState<string | null>(null);

  // modal states
  const [showTransactionModal, setShowTransactionModal] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<ITransactionHistory>();

  // banks states
  const [banks, setBanks] = React.useState<IBanks>();
  const [verifiedAccountName, setVerifiedAccountName] = React.useState<string | null>('');

  // validation states
  const [amountError, setSetAmountError] = React.useState<string | null>(null);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  // transaction states
  const [recpCode, setRecpCode] = React.useState<string>('');

  // open & Close transaction modal
  const toggleTransactionModal = (data?: any) => {
    setShowTransactionModal(!showTransactionModal);
    setModalData(data);
  };

  // get banks
  React.useEffect(() => {
    getBanks()
      .then(res => {
        setBanks(res);
      })
  }, []);

  // verify account
  const verifyAccRequest = async () => {
    setLoading(true);
    verifyAccount(accountNumber, bankCode)
      .then(res => {
        setLoading(false);
        setVerifiedAccountName(res.account_name);
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  // init account verification
  React.useEffect(() => {
    if (accountNumber.length === 10 && bankCode) {
      verifyAccRequest();
    }
  }, [accountNumber, bankCode]);

  // form validation
  React.useEffect(() => {
    if (bankCode && accountNumber && amount && verifiedAccountName) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [accountNumber, amount, bankCode, verifiedAccountName]);

  // amount validation
  const validateAmount = () => {
    if (amount < 100 || amount > 10000000){
      setSetAmountError('Amount Must Not Be Less Than 100 / Max Amount Allowed Is 10,000,000');
      return false;
    } else{
      setSetAmountError(null);
      return true;
    }
  };

  React.useEffect(() => {
    if (amountError !== null) {
      toast.error(amountError);
    }
  }, [amountError]);

  // reason validation
  let descriptionDefault = description ? description : '';
      
  // transfer / form request
  const transferFunds = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const validationRes = validateAmount();
    console.log(validationRes);
    if (validationRes === true) {
      const transferRecpient = {
        type: 'nuban',
        account_number: accountNumber,
        bank_code: bankCode,
        currency: 'NGN',
        name: verifiedAccountName
      }
      transferRecp(transferRecpient)
        .then(res => {
          console.log(res);
          setRecpCode(res.recipient_code);

            const transferData = {
              amount: amount.toString(),
              source: "balance",
              recipient: recpCode,
              reason: descriptionDefault
            }

            initTransfer(transferData)
              .then(res => {
                console.log(res);
                setLoading(false);
                toast.success('Transfer Successful');
              })
              .catch(err => {
                console.log(err);
                setLoading(false);
                toast.error(err.response.data.message);
              })
        }).catch(err => {
          console.log(err);
          setLoading(false);
        });
    } else {
      console.log('error occured');
      setLoading(false);
    }
  };

  return (
    <>
      {/* Transaction Modal Component */}
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
              {amountError && <span>{amountError}</span>}
            </div>
            <div className={styles.option}>
              <label>Description</label>
              <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="payment description (optional)"
              />
            </div>
            <button disabled={disabled === true || loading === true}>{loading ? '...' : 'Transfer'}</button>
          </Box>
        </form>
        <div className={styles.right}>
          <Box>
            <>
              <p className={styles.title}>Recent Transactions</p>
              {data.map(i => (
                // Transaction Component
                <TransactionBox 
                  key={i.id}
                  onClick={() => toggleTransactionModal(i)}
                  data={i}
                />
              ))}
            </>
          </Box>
        </div>
      </main>
    </>
  )
}

export default HomeView;