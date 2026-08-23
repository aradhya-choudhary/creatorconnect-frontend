import { useState, useEffect } from 'react'
import { getListings, applyToListing } from '../api'

const nicheImages = {
  food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=200&fit=crop',
  fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=200&fit=crop',
  fitness: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=200&fit=crop',
  education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop',
  gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
  lifestyle: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=200&fit=crop',
  tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
  travel: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=200&fit=crop',
  other: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop'
}

function ListingsPage() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(null)
  const [form, setForm] = useState({ pitch: '', rate: '' })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await getListings()
        setListings(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  const handleApply = (listingId) => {
    if (!user) {
      window.location.href = '/login'
      return
    }
    if (user.role !== 'creator') {
      setError('Only creators can apply')
      return
    }
    setApplying(listingId)
    setError('')
    setSuccess('')
  }

  const handleSubmitApplication = async (listingId) => {
    try {
      await applyToListing(listingId, {
        pitch: form.pitch,
        rate: Number(form.rate)
      })
      setSuccess('Application submitted successfully!')
      setApplying(null)
      setForm({ pitch: '', rate: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading listings...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Browse Collabs</h1>
          <p className="text-gray-500 text-sm mt-1">Find the perfect brand to work with</p>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {listings.length === 0 ? (
          <p className="text-gray-500">No listings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">

                <img
                  src={nicheImages[listing.niche] || nicheImages.other}
                  alt={listing.niche}
                  className="w-full h-40 object-cover"
                />

                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="font-semibold text-gray-800">{listing.brandName}</h2>
                      <p className="text-xs text-gray-400 mt-0.5">{listing.location}</p>
                    </div>
                    <span className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
                      {listing.niche}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{listing.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {listing.minFollowers.toLocaleString()}+ followers
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400">Budget</p>
                      <p className="text-sm font-semibold text-purple-600">
                        ₹{listing.budgetMin.toLocaleString()} – ₹{listing.budgetMax.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleApply(listing._id)}
                      className="bg-purple-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-purple-700"
                    >
                      Apply Now
                    </button>
                  </div>

                  {applying === listing._id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <textarea
                        placeholder="Write your pitch..."
                        value={form.pitch}
                        onChange={(e) => setForm({ ...form, pitch: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                        rows={3}
                      />
                      <input
                        type="number"
                        placeholder="Your rate (₹)"
                        value={form.rate}
                        onChange={(e) => setForm({ ...form, rate: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSubmitApplication(listing._id)}
                          className="flex-1 bg-purple-600 text-white text-xs py-2 rounded-lg hover:bg-purple-700"
                        >
                          Submit Application
                        </button>
                        <button
                          onClick={() => setApplying(null)}
                          className="flex-1 border border-gray-200 text-gray-600 text-xs py-2 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ListingsPage