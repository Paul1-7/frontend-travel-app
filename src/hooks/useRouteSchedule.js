import { useRef } from 'react'
import { useState } from 'react'

export const useRouteSchedule = ({ datesSelected, methods, initialForm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isUpdateEvent = useRef(false)

  const handleDateSelect = (selectInfo) => {
    datesSelected.current = selectInfo
    methods.reset(initialForm)
    isUpdateEvent.current = false
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const getData = () => {
    const { endStr, startStr } = datesSelected.current ?? {}
    return {
      horarioEntrada: startStr,
      horarioSalida: endStr
    }
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
    getData,
    handleModalClose,
    isModalOpen,
    isUpdateEvent: isUpdateEvent.current
  }
}
