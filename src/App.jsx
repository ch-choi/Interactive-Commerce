import { CartProvider } from './context/CartContext'
import MainPage from './pages/MainPage'

function App() {
  return (
    <CartProvider>
      <MainPage />
    </CartProvider>
  )
}

export default App
