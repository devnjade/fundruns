import type { AppProps } from 'next/app';
import 'styles/index.scss';

// toast package import
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}

export default MyApp
