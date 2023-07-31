import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react'
import PlaceScheduleForm from './PlaceScheduleForm'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '@/schemas'
import { DASHBOARD, TEXT_MODAL, initialFormPlaceSchedule } from '@/constants'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  addPlacesSchedule,
  deletePlacesSchedule,
  listPlaces,
  modifyPlacesSchedule,
  placesSchedulesListDetail
} from '@/services'
import { useRepeatEvents, useSchedule } from '@/hooks'
import PlaceSchedulePopoper from './PlaceSchedulePopoper'
import PlaceScheduleEventContent from './PlaceScheduleEventContent'
import rrulePlugin from '@fullcalendar/rrule'
import { DashboardContainer, DialogConfirmation } from '@/ui-component'

const Schedules = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState()
  const datesSelected = useRef(null)
  const eventSelected = useRef(null)

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  const listSchedules = useQuery({
    queryKey: ['schedulesList'],
    queryFn: placesSchedulesListDetail
  })

  const { eventsWithRules } = useRepeatEvents({ events: listSchedules.data })

  const places = useQuery({
    queryKey: ['placesList'],
    queryFn: listPlaces
  })

  const addScheduleData = useMutation({
    mutationFn: (data) => {
      return addPlacesSchedule({ data })
    },
    onSuccess: listSchedules.refetch
  })
  const modifyScheduleData = useMutation({
    mutationFn: (data) => {
      return modifyPlacesSchedule({ data, id: data.id })
    },
    onSuccess: listSchedules.refetch
  })

  const deleteScheduleData = useMutation({
    mutationFn: (id) => deletePlacesSchedule({ id }),
    onSuccess: listSchedules.refetch
  })

  const methods = useForm({
    resolver: yupResolver(schema.placesSchedule),
    defaultValues: initialFormPlaceSchedule,
    mode: 'all',
    criteriaMode: 'all'
  })

  const handleDelete = (id) => {
    deleteScheduleData.mutate(id)
  }

  const {
    handleModalClose,
    handleSubmit,
    handleDateSelect,
    handleClickEvent,
    isUpdateEvent,
    isModalOpen
  } = useSchedule({
    addScheduleData,
    modifyScheduleData,
    datesSelected,
    methods,
    initialForm: initialFormPlaceSchedule
  })

  return (
    <DashboardContainer data={DASHBOARD.placesSchedules.default}>
      <DialogConfirmation
        open={isDialogOpen}
        handleClickClose={closeDialog}
        textContent={TEXT_MODAL.delete}
        handleDelete={handleDelete}
        loading={deleteScheduleData.isLoading}
        id={methods.watch('id')}
      />
      <PlaceSchedulePopoper
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        data={eventSelected.current}
      />
      <PlaceScheduleForm
        isOpen={isModalOpen}
        onClose={handleModalClose}
        places={places.data}
        methods={methods}
        onSubmit={handleSubmit}
        isUpdateEvent={isUpdateEvent}
        openDialog={openDialog}
      />
      <FullCalendar
        plugins={[interactionPlugin, rrulePlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={eventsWithRules}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        }}
        slotMinTime={'06:00:00'}
        allDaySlot={false}
        locale={esLocale}
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: 'short'
        }}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        }}
        timeZone="local"
        aspectRatio={2}
        selectable
        selectMirror
        select={handleDateSelect}
        eventClick={handleClickEvent}
        eventMouseEnter={(info) => {
          eventSelected.current = info.event
          setAnchorEl(info.el)
        }}
        eventMouseLeave={() => {
          setAnchorEl(null)
        }}
        eventOverlap
        slotEventOverlap
        eventContent={PlaceScheduleEventContent}
      />
    </DashboardContainer>
  )
}

export default Schedules
