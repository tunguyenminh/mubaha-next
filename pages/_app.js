import "../public/assets/scss/app.scss";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import TapTop from "@/components/TapTop.js";
export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);

  return (
    <SessionProvider>
      {layout}
      <ToastContainer />
      <TapTop />
    </SessionProvider>
  );
}
