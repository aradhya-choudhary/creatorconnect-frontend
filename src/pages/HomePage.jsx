import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <span className="bg-purple-100 text-purple-700 text-xs font-medium px-4 py-1.5 rounded-full">
          For creators under 10k followers
        </span>

        <h1 className="text-5xl font-bold text-gray-900 mt-6 mb-4 leading-tight">
          Can't find the <span className="text-purple-600">right collab?</span>
        </h1>

        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          We connect micro-creators with local businesses looking for authentic partnerships. No follower gates, no middlemen.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/listings"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700"
          >
            Browse Collabs
          </Link>
          <Link
            to="/register"
            className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
          >
            Post a Listing
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-y border-gray-200 py-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-purple-600">500+</p>
            <p className="text-gray-500 text-sm mt-1">Creators</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-600">120+</p>
            <p className="text-gray-500 text-sm mt-1">Businesses</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-600">₹2L+</p>
            <p className="text-gray-500 text-sm mt-1">Paid out</p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-lg">1</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Create your profile</h3>
            <p className="text-gray-500 text-sm">Set up your creator profile with your niche, platform and follower count.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-lg">2</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Browse listings</h3>
            <p className="text-gray-500 text-sm">Find brands looking for creators in your niche and location.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-lg">3</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Apply and collab</h3>
            <p className="text-gray-500 text-sm">Send your pitch, get accepted and start creating content for the brand.</p>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-purple-600 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to find your next collab?</h2>
          <p className="text-purple-200 mb-8">Join hundreds of creators already finding brand deals on CreatorConnect.</p>
          <Link
            to="/register"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100"
          >
            Get Started Free
          </Link>
        </div>
      </div>

    </div>
  )
}

export default HomePage