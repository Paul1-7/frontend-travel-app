import { useEffect } from 'react'

export const useResetError = ({ duration = 3000, fn, ctx }) => {
  useEffect(() => {
    let timeoutArray = []
    ctx.forEach((item) => {
      if (!item.error && !item.isSuccess) return

      const timeout = setTimeout(() => {
        fn()

        timeoutArray.push(timeout)
      }, duration)
    })
    ;() => {
      timeoutArray.forEach((timeout) => {
        clearTimeout(timeout)
      })
    }
  }, [ctx])
}
