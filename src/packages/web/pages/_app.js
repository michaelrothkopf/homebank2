import '../styles/globals.css'
import Script from "next/script"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://kit.fontawesome.com/c669d65f93.js" crossOrigin="anonymous" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
