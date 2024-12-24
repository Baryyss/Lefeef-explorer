import { useState } from 'react';
import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';

export const useOverview = (t) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCopyToClipboard = (value: string) => {
    copy(value);
    toast(t('common:copied'));
  };

  return {
    open,
    handleClose,
    handleOpen,
    handleCopyToClipboard,
  };
};

/* export const useGenerateMnemonicRecoil =()=>{

  const [state,setState] = useState<{
    accountMnemonic : string ;
    accountAddress: string ;
    accountName : string ;
    accountNumber : string ;
  }>({
    accountMnemonic:"",
    accountAddress:"",
    accountName:"",
    accountNumber:""
  })
  const createNewAccount =async()=>{
    const wallet = await Secp256k1HdWallet.generate(12,{
      prefix: "ggez",
    });
    console.log("Mnemonic:", wallet.mnemonic);
    
    const [{ address }] = await wallet.getAccounts();
    console.log("Address:", address);
    let data = {
      accountMnemonic:wallet.mnemonic,
      accountAddress:address,
      accountName: state.accountName ,
      accountNumber :state.accountNumber
    }

    console.log(data,'data')
    wallet && address ? setState(data): null
  }
  return {
    state ,
    createNewAccount
  }
 

} */
