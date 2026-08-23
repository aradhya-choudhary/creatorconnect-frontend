import { useState, useEffect } from 'react'
import { getMyProfile, createProfile } from '../api'
import { useNavigate } from 'react-router-dom'

function ProfilePage() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  if (!user) {
    navigate('/login')
    return
  }
  const fetchProfile = async () => {
    try {
      const res = await getMyProfile()
      setProfile(res.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  fetchProfile()
}, [])

const [formData, setFormData] = useState({
  bio: '',
  niche: 'lifestyle',
  platform: 'instagram',
  followersCount: '',
  location: ''
})
const [error, setError] = useState('')
const [saving, setSaving] = useState(false)

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value })
}

const handleSubmit = async (e) => {
  e.preventDefault()
  setSaving(true)
  try {
    const res = await createProfile({
      ...formData,
      followersCount: Number(formData.followersCount)
    })
    setProfile(res.data)
    setSaving(false)
  } catch (err) {
    setError(err.response?.data?.message || 'Something went wrong')
    setSaving(false)
  }
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
      <div className="max-w-2xl mx-auto">

        {profile ? (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
              <p className="text-gray-500 text-sm mt-1">Your creator profile</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 text-xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Niche</p>
                  <p className="text-sm font-medium text-gray-800 capitalize">{profile.niche}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Platform</p>
                  <p className="text-sm font-medium text-gray-800 capitalize">{profile.platform}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Followers</p>
                  <p className="text-sm font-medium text-gray-800">{profile.followersCount.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Location</p>
                  <p className="text-sm font-medium text=gray-800">{profile.location || 'Not set'}</p>
                </div>
              </div>

              {profile.bio && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Bio</p>
                  <p className="text-sm text-gray-700">{profile.bio}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Setup Your Profile</h1>
              <p className="text-gray-500 text-sm mt-1">Tell brands about yourself</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell brands about yourself..."
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
                  <label className="text-sm font-medium text-gray-700 block mb-1">Platform</label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Followers Count</label>
                  <input
                    type="number"
                    name="followersCount"
                    value={formData.followersCount}
                    onChange={handleChange}
                    placeholder="e.g. 9000"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Delhi"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage

  