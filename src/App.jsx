import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TopBar from './components/navigation/TopBar';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';

function App() {

  return (
    <BrowserRouter>
      <div className='flex flex-col h-screen overflow-hidden'>
        <TopBar />
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/auth' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/me' element={<AccountPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
