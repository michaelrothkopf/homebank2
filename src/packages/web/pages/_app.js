import '../styles/globals.css'
import Script from "next/script"
import LoginErrorModal from "../components/loginErrorModal"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LoginErrorModal />
      <Script src="https://kit.fontawesome.com/c669d65f93.js" crossOrigin="anonymous" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
