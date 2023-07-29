import { put, call, select } from "redux-saga/effects";
import { connectWalletSucess } from "../../slice/user";
import Web3 from "web3";

export function* connectWallet(action) {
  if (window.ethereum) {
    window.ethereum.enable();

    const account = yield ethereum.request({
      method: "eth_requestAccounts",
    });

    const web3 = new Web3(window.ethereum);

    if (account) {
      const balanceInWei = yield web3.eth.getBalance(account[0]);
      const balance = web3.utils.fromWei(parseInt(balanceInWei), "ether");
      yield put(
        connectWalletSucess({
          account,
          balance,
          formattedAccount: `0x.....${account[0].slice(-5)}`,
        })
      );
    }
  } else {
    alert("install metamask extension!!");
  }
}

export function* loadUser(action) {
  if (window.ethereum) {
    window.ethereum.enable();
    const account = yield ethereum.request({
      method: "eth_requestAccounts",
    });

    const web3 = new Web3(window.ethereum);

    if (account) {
      const balanceInWei = yield web3.eth.getBalance(account[0]);
      console.log(parseInt(balanceInWei));
      const balance = web3.utils.fromWei(parseInt(balanceInWei), "ether");
      yield put(
        connectWalletSucess({
          account,
          balance,
          formattedAccount: `0x.....${account[0].slice(-5)}`,
        })
      );
    }
  } else {
    alert("install metamask extension!!");
  }
}
