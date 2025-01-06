
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage/LoginPage'
import OrderPage from './components/OrderPage/OrderPage'



function App() {


  return (

      <Routes>

          <Route path="/" element={<LoginPage /> } />
          <Route path="orderPage/:inputName" element={<OrderPage/>} />


      </Routes>
      
 

  )

}

export default App
