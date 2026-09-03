import axios from 'axios'

const API = axios.create({
  baseURL: 'https://creatorconnect-backend-p84k.onrender.com/api'
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)
export const getListings = (filters) => API.get('/listings', { params: filters })
export const getListing = (id) => API.get(`/listings/${id}`)
export const createProfile = (data) => API.post('/creators', data)
export const getMyProfile = () => API.get('/creators/me')
export const applyToListing = (id, data) => API.post(`/applications/${id}/apply`, data)
export const getMyApplications = () => API.get('/applications/my')
export const createListing = (data) => API.post('/listings', data)