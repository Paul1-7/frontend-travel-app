import { useEffect } from 'react'
import { toast } from 'sonner'

const useSnackBarMessage = ({ errors = [], successes = [] }) => {
  useEffect(() => {
    errors.some((error) => {
      if (typeof error === 'string' || error instanceof Error)
        toast.error(error)
      return false
    })
  }, [errors])

  useEffect(() => {
    successes.some((success) => {
      if (typeof success === 'string') toast.success(success)
      return true
    })
  }, [successes])
}

export default useSnackBarMessage
