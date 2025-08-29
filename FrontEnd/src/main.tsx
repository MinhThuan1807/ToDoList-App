// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

// Config redux-persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

// Store injection technique: a technique used when you need to use the redux store variable in files outside the component scope
import { injectStore } from './utils/authorizeAxios.ts'
injectStore(store)

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
      <ToastContainer position="top-right" theme="colored" />
    </PersistGate>
  </Provider>
)
