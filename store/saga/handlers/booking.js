import { put, select } from "redux-saga/effects";
import Web3 from "web3";
import contactAbi from "../../../lib/TravelHomeAbi.json";
import { getUser } from "../../selectors";
import {
  bookingError,
  bookingLoading,
  bookingSucess,
} from "../../slice/booking";

const contractAddress = "0x2503E21f01787cDab5C2A7Cd81D4993266C24169";

export function* bookRoom(action) {
  const { newDate, id, price } = action;
  yield put(bookingLoading());

  window.ethereum.enable();
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(contactAbi, contractAddress);

  const functionName = "bookRoom";
  const { account: address } = yield select(getUser);
  console.log(address);
  if (address[0]) {
    try {
      const transactionObject = contract.methods[functionName](id, newDate);
      const receipt = yield transactionObject.send({
        from: address[0],
        value: price,
      });

      console.log("Transaction Receipt:", receipt);
      yield put(bookingSucess(receipt));
    } catch (err) {
      console.log(err);
      yield put(bookingError(err));
    }
  }
}
