import "../styles/main.css";
import { ToastProvider } from "react-toast-notifications";
import { Provider } from "next-auth/client";
import "@fortawesome/fontawesome-svg-core/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </Provider>
  );
}

export default MyApp;
