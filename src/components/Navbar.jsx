import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-purple-600">
        CreatorConnect
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/listings" className="text-gray-600 hover:text-purple-600 text-sm font-medium">
          Browse
        </Link>

        {user ? (
  <>
    <span className="text-sm text-gray-600">Hi, {user.name}</span>
    {user.role === 'business' && (
  <>
    <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 text-sm font-medium">
      Dashboard
    </Link>
    <Link to="/post-listing" className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700">
      Post Listing
    </Link>
  </>
)}
    {user.role === 'creator' && (
  <>
    <Link to="/my-applications" className="text-gray-600 hover:text-purple-600 text-sm font-medium">
      My Applications
    </Link>
    <Link to="/profile" className="text-gray-600 hover:text-purple-600 text-sm font-medium">
      Profile
    </Link>
  </>
)}
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 hover:text-red-600 font-medium"
    >
      Logout
    </button>
  </>
) : (
  <>
    <Link to="/login" className="text-gray-600 hover:text-purple-600 text-sm font-medium">
      Login
    </Link>
    <Link to="/register" className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700">
      Sign Up
    </Link>
  </>
)}
      </div>
    </nav>
  )
}

export default Navbar