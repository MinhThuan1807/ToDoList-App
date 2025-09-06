let apiRoot: string = ''
if (process.env.BUILD_MODE === 'production') {
  apiRoot = ''
} else {
  apiRoot = 'http://localhost:8017'
}
export const API_URL = apiRoot
