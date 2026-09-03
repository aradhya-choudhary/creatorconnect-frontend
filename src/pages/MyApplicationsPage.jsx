import { useState, useEffect } from 'react'
import { getMyApplications } from '../api'
import { useNavigate } from 'react-router-dom'

function MyApplicationsPage() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    const fetchApplications = async () => {
      try {
        const res = await getMyApplications()
        setApplications(res.data)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    fetchApplications()
  }, [])

  const getStatusColor = (status) => {
    if (status === 'accepted') return 'bg-green-100 text-green-700'
    if (status === 'rejected') return 'bg-red-100 text-red-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
          <p className="text-gray-500 text-sm mt-1">Track your collab requests</p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-500 mb-4">You haven't applied to anything yet.</p>
            <button
              onClick={() => navigate('/listings')}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-purple-700"
            >
              Browse Listings
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app._id} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {app.listing?.brandName || 'Brand'}
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5 capitalize">
                      {app.listing?.niche} • ₹{app.listing?.budgetMin?.toLocaleString()} – ₹{app.listing?.budgetMax?.toLocaleString()}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-xs text-gray-400 mb-1">Your pitch</p>
                  <p className="text-sm text-gray-700">{app.pitch}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    Your rate: <span className="font-medium text-gray-700">₹{app.rate?.toLocaleString()}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Applied: {new Date(app.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyApplicationsPage