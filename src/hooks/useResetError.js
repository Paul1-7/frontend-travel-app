import { useEffect } from 'react'

export const useResetError = ({ duration = 3000, fn, ctx }) => {
  useEffect(() => {
    let timeoutArray = []
    ctx.forEach((item) => {
      console.log('TCL: useResetError -> item', item)
      if (!item.error && !item.isSuccess) return

      const timeout = setTimeout(() => {
        console.log(fn)
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
