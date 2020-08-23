import '../styles/globals.css'
import 'fontsource-roboto';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
  return (
    <>
        <Head>
            <title>{"Employees Data"}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
    </>
  )
}

export default MyApp
