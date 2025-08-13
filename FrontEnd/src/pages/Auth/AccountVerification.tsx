import { useEffect, useState } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import { verifyEmail } from '../../services/authService'
import { RingLoader } from 'react-spinners'
import { toast } from 'react-toastify'

function AccountVerification() {
  const [searchParams] = useSearchParams()
  const [verified, setVerified] = useState(false)
  const { email, token } = Object.fromEntries(searchParams)
  useEffect(() => {
    if (email && token) {
      verifyEmail({ email, token })
        .then(() => {
          setVerified(true)
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message || 'Verification failed')
        })
    }
  }, [email, token])

  if (!verified) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
  }
  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification
