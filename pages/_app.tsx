import { AppProps } from "next/app";
import "@/app/globals.css";
import { Poppins } from "next/font/google";
import { Provider } from "react-redux";
import store from "@/redux/store";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}

export default MyApp;
