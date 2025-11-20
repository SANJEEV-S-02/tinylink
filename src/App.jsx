import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Home from './pages/Dashboard/Home';
import Studentlist from './pages/studentlist/studentlist';
import { Toaster } from 'react-hot-toast';
import { ScrollToTop } from './components/common/ScrollToTop';
import ProtectedRoute from './ProtectedRoute';
import SignUpForm from './components/auth/SignupForm';
import SignInForm from './components/auth/SignInForm';
import LandingHero from './Landing-components/LandingHero';
import RedirectPage from './pages/Dashboard/RedirectPage';

export default function App() {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <ScrollToTop />

      <Routes>
        <Route path="/:code" element={<RedirectPage />} />

        <Route path="/" element={<LandingHero />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Home />} />
          <Route path="/shortlinks" element={<Studentlist />} />
        </Route>
      </Routes>
    </>
  );
}
