import { useRef } from 'react'
import { useState } from 'react'

export const useSchedule = ({
  addScheduleData,
  modifyScheduleData,
  datesSelected,
  methods,
  initialForm
}) => {
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

  const handleSubmit = (data) => {
    const { endStr, startStr } = datesSelected.current ?? {}

    if (isUpdateEvent.current) {
      modifyScheduleData.mutate(data)
      handleModalClose()
      return
    }

    const newData = {
      ...data,
      horarioEntrada: startStr,
      horarioSalida: endStr
    }

    addScheduleData.mutate(newData)
    handleModalClose()
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
    handleSubmit,
    handleModalClose,
    isModalOpen,
    isUpdateEvent: isUpdateEvent.current
  }
}
