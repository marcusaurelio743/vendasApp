
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'bulma/css/bulma.css'
export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
    <Head>
    <title>Aplicação de vendas</title>
    </Head>
    <Component {...pageProps} />
    </>
  )
}
