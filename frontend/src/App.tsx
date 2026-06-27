import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Family from './pages/Family/Family';
import Income from './pages/Income/Income';
import Expenses from './pages/Expenses/Expenses';
import Budget from './pages/Budget/Budget';
import Bills from './pages/Bills/Bills';
import Properties from './pages/Properties/Properties';
import Animals from './pages/Animals/Animals';
import Vehicles from './pages/Vehicles/Vehicles';
import Calendar from './pages/Calendar/Calendar';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import AIAssistant from './pages/AI/AIAssistant';
import Login from './pages/Auth/Login';
import PINLogin from './pages/Auth/PINLogin';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/pin-login" element={<PINLogin />} />

      {/* Protected Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/family" element={<Family />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/ai" element={<AIAssistant />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
