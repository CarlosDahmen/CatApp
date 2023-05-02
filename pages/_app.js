import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import { initFirebase } from "@/services/firebase";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  initFirebase();
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />;
    </main>
  );
}
