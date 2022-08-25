import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";
import "../styles/materialUI.css";
import { TravelHomeContextProvider } from "../context/TravelHomeContext.js";
import NavBar from "../components/navbar.js";
import { NotificationProvider } from "web3uikit";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/roomcalender.css";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}
      appId={process.env.NEXT_PUBLIC_APP_ID}
    >
      <TravelHomeContextProvider>
        <Toaster />
        <div className="block w-[1180px] px-6 mx-auto">
          <NavBar />
          <Component {...pageProps} />
        </div>
      </TravelHomeContextProvider>
    </MoralisProvider>
  );
}

export default MyApp;
