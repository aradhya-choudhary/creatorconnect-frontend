import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function BusinessDashboardPage() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [listings, setListings] = useState([])
  const [applications, setApplications] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedListing, setSelectedListing] = useState(null)

  if (!user || user.role !== 'business') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Only businesses can access this page.</p>
      </div>
    )
  }

  useEffect(() => {
    fetchMyListings()
  }, [])

  const fetchMyListings = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:3000/api/listings/my', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setListings(res.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const fetchApplications = async (listingId) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`http://localhost:3000/api/applications/listing/${listingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setApplications(prev => ({ ...prev, [listingId]: res.data }))
      setSelectedListing(listingId)
    } catch (err) {
      console.log(err)
    }
  }

  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:3000/api/applications/${applicationId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setApplications(prev => ({
        ...prev,
        [selectedListing]: prev[selectedListing].map(app =>
          app._id === applicationId ? { ...app, status } : app
        )
      }))
    } catch (err) {
      console.log(err)
    }
  }

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
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Business Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your listings and applications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Your Listings</h2>
            {listings.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <p className="text-gray-500 text-sm mb-3">No listings yet</p>
                <button
                  onClick={() => navigate('/post-listing')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
                >
                  Post your first listing
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {listings.map((listing) => (
                  <div
                    key={listing._id}
                    onClick={() => fetchApplications(listing._id)}
                    className={`bg-white rounded-xl border p-4 cursor-pointer hover:border-purple-300 transition ${selectedListing === listing._id ? 'border-purple-500' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">{listing.brandName}</h3>
                        <p className="text-xs text-gray-400 mt-0.5 capitalize">{listing.niche} • {listing.location}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${listing.isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {listing.isOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      ₹{listing.budgetMin.toLocaleString()} – ₹{listing.budgetMax.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Applications</h2>
            {!selectedListing ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <p className="text-gray-500 text-sm">Click a listing to see applications</p>
              </div>
            ) : applications[selectedListing]?.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <p className="text-gray-500 text-sm">No applications yet for this listing</p>
              </div>
            ) : (
              <div className="space-y-3">
                {applications[selectedListing]?.map((app) => (
                  <div key={app._id} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{app.creator?.name}</p>
                        <p className="text-xs text-gray-400">{app.creator?.email}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-gray-400 mb-1">Pitch</p>
                      <p className="text-sm text-gray-700">{app.pitch}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">Rate: <span className="font-medium">₹{app.rate?.toLocaleString()}</span></p>
                      {app.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(app._id, 'accepted')}
                            className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-600"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateStatus(app._id, 'rejected')}
                            className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessDashboardPage