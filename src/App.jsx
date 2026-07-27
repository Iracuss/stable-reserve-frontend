import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TopBar from './components/navigation/TopBar';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LandingPage from './pages/LandingPage';
import StablesPage from './pages/StablesPage';
import InvitesPage from './pages/InvitesPage';

function App() {

  return (
    <BrowserRouter>
      <div className='flex flex-col h-screen'>
        <TopBar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/invites' element={<InvitesPage />} />
          <Route path='/stables' element={<StablesPage />} />
          <Route path='/dashboard/:stableId' element={<DashboardPage />} />
          <Route path='/auth' element={<LoginPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/me' element={<AccountPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
