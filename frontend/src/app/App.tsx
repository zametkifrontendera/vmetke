import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { AuthPage } from '../pages/AuthPage'
import { RoutesEnum } from '../shared/config/routes'
import '../shared/lib/styles/globals.scss'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesEnum.HOME} element={<HomePage />} />
        <Route path={RoutesEnum.AUTH} element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}