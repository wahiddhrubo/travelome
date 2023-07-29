import "../styles/globals.css";
import "../styles/materialUI.css";
import { TravelHomeContextProvider } from "../context/TravelHomeContext.js";
import NavBar from "../components/navbar.js";
import Footer from "../components/footer.js";
import { Provider, useDispatch } from "react-redux";
import store from "../store/store";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import "slick-carousel/slick/slick-theme.css";
import "../styles/roomcalender.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Toaster />
      <div className={`overflow-x-hidden`}>
        <div className="block lg:w-[1180px] md:w-[580px] w-[400px] px-6 mx-auto">
          <NavBar />
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default MyApp;
