import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { ContextProvider } from './context/usersContext';

const StatisticsPage = lazy(() => import('./pages/statistics/StatisticsPage'));
const UsersPage = lazy(() => import('./pages/users/UsersPage'));

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ContextProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" exact element={<StatisticsPage />} />
            <Route path="users" element={<UsersPage />} />
          </Routes>
        </Suspense>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
