import { owner, primaryColor } from "../lib/constants.js";
import { useState, useEffect, useContext } from "react";
import { TravelHomeContext } from "../context/TravelHomeContext.js";

export default function Prices({
  roomPriceByNumOfDay,
  transactionFee,
  totalPrice,
  account,
}) {
  const styles = {
    prices: `text-[${primaryColor}] font-semibold text-lg`,
    wrapper: `text-black font-semibold text-lg leading-10`,
    divider: "border-black w-[150px] my-2 mx-auto ",
  };
  return (
    <div>
      {owner == account ? (
        <div className={styles.wrapper}>
          Room Price :{" "}
          <span className={styles.prices}>
            {roomPriceByNumOfDay.toString()} Matic
          </span>{" "}
          <br />
          Transaction Fee : <span className={styles.prices}>0 Matic</span>{" "}
          <br />
          <hr className={styles.divider} />
          Total Fee :{" "}
          <span className={styles.prices}>
            {roomPriceByNumOfDay.toString()} Matic
          </span>{" "}
          <br />
        </div>
      ) : (
        <div className={styles.wrapper}>
          Room Price :{" "}
          <span className={styles.prices}>
            {roomPriceByNumOfDay.toString()} Matic
          </span>{" "}
          <br />
          Transaction Fee :{" "}
          <span className={styles.prices}>
            {transactionFee.toString()} Matic
          </span>{" "}
          <br />
          <hr className={styles.divider} />
          Total Fee :{" "}
          <span className={styles.prices}>
            {totalPrice.toString()} Matic
          </span>{" "}
          <br />
        </div>
      )}
    </div>
  );
}
