import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./components/ProtectedRoute"
import RegisterPage from "./pages/RegisterPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />

        <Route element={ <ProtectedRoute/> }>
          <Route path="/" element={ <HomePage /> } />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App