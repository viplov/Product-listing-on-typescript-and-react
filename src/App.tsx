import Header from './components/Header'
import Products from './components/Products'
import { AppProvider } from './context/AppContext'
import './App.css'

function App() {
  return (
    <AppProvider>
        <Header />
        <Products />
    </AppProvider>
  )
}

export default App
