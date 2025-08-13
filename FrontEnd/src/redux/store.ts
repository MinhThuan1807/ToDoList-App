import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'] // user data can store in redux when press f5
}

const reducers = combineReducers({
  user: userReducer
})

// Process persist Reducer
const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,

  // Fix warning: error when implement redux-persist (NON-SERIALIZABLE)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
