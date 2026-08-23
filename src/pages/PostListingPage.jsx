import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createListing } from '../api'

function PostListingPage() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    brandName: '',
    description: '',
    niche: 'food',
    minFollowers: '',
    budgetMin: '',
    budgetMax: '',
    location: '',
    deadline: ''
  })

  if (!user || user.role !== 'business') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Only businesses can post listings.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-purple-700"
          >
            Login as Business
          </button>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await createListing({
        ...formData,
        minFollowers: Number(formData.minFollowers),
        budgetMin: Number(formData.budgetMin),
        budgetMax: Number(formData.budgetMax)
      })
      navigate('/listings')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Post a Collaboration</h1>
          <p className="text-gray-500 text-sm mt-1">Find the perfect creator for your brand</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                placeholder="e.g. XYZ Cafe"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What are you looking for?"
                required
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Niche</label>
              <select
                name="niche"
                value={formData.niche}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="food">Food</option>
                <option value="fashion">Fashion</option>
                <option value="fitness">Fitness</option>
                <option value="education">Education</option>
                <option value="gaming">Gaming</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="tech">Tech</option>
                <option value="travel">Travel</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Minimum Followers</label>
              <input
                type="number"
                name="minFollowers"
                value={formData.minFollowers}
                onChange={handleChange}
                placeholder="e.g. 5000"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Budget Min (₹)</label>
                <input
                  type="number"
                  name="budgetMin"
                  value={formData.budgetMin}
                  onChange={handleChange}
                  placeholder="e.g. 3000"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Budget Max (₹)</label>
                <input
                  type="number"
                  name="budgetMax"
                  value={formData.budgetMax}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Delhi, Mumbai"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post Listing'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostListingPage