import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DynamicComponent from './components/DynamicComponent';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import DashboardPage from './Pages/DashboardPage';
import ConfirmEmail from './components/ConfirmEmail';
import CreateSpaceSuccess from './components/CreateSpaceSuccess';
import TestimonialOuter from './components/TestimonialOuter';
import IndividualTestimonial from './components/IndividualTestimonial';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/confirmemail" element={<ConfirmEmail />} />
          <Route path="/createspacesuccess" element={<CreateSpaceSuccess />} />
          <Route path="/individual/testimonials/:testimonialId" element={<IndividualTestimonial />} />
          <Route path="/testimonials/:spaceId" element={<TestimonialOuter />} />
          <Route path="/:spaceId" element={<DynamicComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
