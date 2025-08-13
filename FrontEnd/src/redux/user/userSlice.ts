import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../utils/constants'

// Add proper types
interface LoginData {
  email: string
  password: string
}

interface UserState {
  currentUser: any | null
}

// Declare initial state in userSlice
const initialState: UserState = {
  currentUser: null
}
export const loginUserApi = createAsyncThunk(
  'user/loginUserApi',
  async (data: LoginData) => {
    const response = await axios.post(`${API_URL}/v1/users/login`, data)

    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducers: handle synchronous actions
  reducers: {},
  // Extra reducers: handle asynchronous actions
  extraReducers: (builder) => {
    builder.addCase(loginUserApi.fulfilled, (state, action) => {
      //action.payload is response.data in loginUserApi
      state.currentUser = action.payload
    })
  }
})

// Selector: get the current user by hook useSelector()
export const selectCurrentUser = (state: { user: UserState }) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer
