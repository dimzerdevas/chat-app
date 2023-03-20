import '../styles/globals.css'
import SocketsProvider from '../context/socket.context'

function App({ Component, pageProps }) {
  return (
    <SocketsProvider>
      <Component {...pageProps} />
    </SocketsProvider>
  );
}

export default App;
