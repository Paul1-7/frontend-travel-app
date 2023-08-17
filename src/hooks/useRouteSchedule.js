import { useRef } from 'react'
import { useState } from 'react'

export const useRouteSchedule = ({ methods, initialForm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isUpdateEvent = useRef(false)
  const [data, setData] = useState(null)

  const handleDateSelect = (selectInfo) => {
    const { endStr, startStr } = selectInfo ?? {}

    methods.reset(initialForm)
    isUpdateEvent.current = false
    setIsModalOpen(true)

    setData({
      horarioEntrada: startStr,
      horarioSalida: endStr
    })
  }

  const resetSelectedRange = () => {
    setData(null)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleClickEvent = (data) => {
    const { extendedProps, endStr, startStr } = data.event
    const { idLugar, id = null } = extendedProps

    const newData = {
      id,
      idLugar,
      endStr,
      startStr
    }
    methods.reset(newData)
    isUpdateEvent.current = true
    setIsModalOpen(true)
  }

  return {
    handleClickEvent,
    handleDateSelect,
    data,
    handleModalClose,
    isModalOpen,
    isUpdateEvent: isUpdateEvent.current,
    resetSelectedRange
  }
}
