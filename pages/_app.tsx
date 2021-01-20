import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout';
import '../styles/global.module.scss'
import { socketContext, socket } from '../utils/context'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <socketContext.Provider value={socket}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </socketContext.Provider>
    )
}

export default App;