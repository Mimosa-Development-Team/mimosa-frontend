const dotenv = () => ({
  apiBaseUrl: process.env.REACT_APP_BACKEND_URL,
  orcidUrl: process.env.REACT_APP_ORCID
})

export default dotenv()
