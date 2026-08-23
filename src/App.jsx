import BusinessDashboardPage from './pages/BusinessDashboardPage'
import MyApplicationsPage from './pages/MyApplicationsPage'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ListingsPage from './pages/ListingsPage'
import ProfilePage from './pages/ProfilePage'
import PostListingPage from './pages/PostListingPage'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/post-listing" element={<PostListingPage />} />
        <Route path="/my-applications" element={<MyApplicationsPage />} />
        <Route path="/dashboard" element={<BusinessDashboardPage />} />
      </Routes>
    </div>
  )
}

export default App