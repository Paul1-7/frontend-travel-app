import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'
import interactionPlugin from '@fullcalendar/interaction'
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '@/schemas'
import {
  DASHBOARD,
  DEFAULT_VALUE_ITEM,
  TEXT_MODAL,
  initialFormRouteListSchedule,
  initialFormRouteSchedule
} from '@/constants'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  addRoutessSchedule,
  deleteRouteSchedule,
  getRoutesSchedulesById,
  listRoutesWithDetails
} from '@/services'
import {
  useDialog,
  useFormFields,
  useRepeatEvents,
  useRouteSchedule
} from '@/hooks'
import PlaceSchedulePopoper from './PlaceSchedulePopoper'
import PlaceScheduleEventContent from './RouteScheduleEventContent'
import rrulePlugin from '@fullcalendar/rrule'
import { DashboardContainer, DialogConfirmation } from '@/ui-component'
import { MenuItem, Select } from '@mui/material'
import { useEffect } from 'react'

const RoutesSchedule = () => {
  const [anchorEl, setAnchorEl] = useState()
  const { closeDialog, isDialogOpen, openDialog } = useDialog()
  const { formFields, handleChange } = useFormFields(
    initialFormRouteListSchedule
  )
  const datesSelected = useRef(null)
  const eventSelected = useRef(null)

  const routes = useQuery({
    queryKey: ['routesList'],
    queryFn: listRoutesWithDetails
  })

  const listSchedules = useQuery([formFields], ({ queryKey }) => {
    const id = queryKey?.[0].route.id
    return getRoutesSchedulesById(id)
  })

  const { events, areTimeRangesOverlapping, backgroundEvents } =
    useRepeatEvents({
      events: listSchedules.data,
      eventsBackground: formFields.route?.horariosLugar
    })

  const addScheduleData = useMutation({
    mutationFn: (data) => {
      return addRoutessSchedule({ data })
    },
    onSuccess: listSchedules.refetch
  })

  const deleteScheduleData = useMutation({
    mutationFn: (id) => deleteRouteSchedule({ id }),
    onSuccess: listSchedules.refetch
  })

  const methods = useForm({
    resolver: yupResolver(schema.placesSchedule),
    defaultValues: initialFormRouteSchedule,
    mode: 'all',
    criteriaMode: 'all'
  })

  const handleDelete = (id) => {
    deleteScheduleData.mutate(id)
  }

  const { handleDateSelect, handleClickEvent, data, resetSelectedRange } =
    useRouteSchedule({
      datesSelected,
      methods,
      initialForm: initialFormRouteSchedule
    })

  useEffect(() => {
    const { route } = formFields

    const isIntersecting = backgroundEvents.flat().some((backEvent) => {
      return areTimeRangesOverlapping(backEvent, data)
    })

    if (route.id === DEFAULT_VALUE_ITEM || !data || !isIntersecting) return

    addScheduleData.mutate({
      ...data,
      idRuta: route.id
    })

    resetSelectedRange()
  }, [formFields, data])

  return (
    <DashboardContainer data={DASHBOARD.routesSchedules.default}>
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
      <Select
        value={formFields.route}
        onChange={handleChange}
        name="route"
        size="small"
        color="secondary"
        sx={{ mb: 4 }}
      >
        <MenuItem value={initialFormRouteListSchedule.route}>
          {initialFormRouteListSchedule.route.titulo}
        </MenuItem>
        {routes.data?.map((route, index) => {
          return (
            <MenuItem key={index} value={route}>
              {route.titulo}
            </MenuItem>
          )
        })}
      </Select>
      <FullCalendar
        plugins={[interactionPlugin, rrulePlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
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
        eventClick={(arg) => {
          const isOpen = arg.event.extendedProps?.title
          !isOpen && openDialog()
          handleClickEvent(arg)
        }}
        eventMouseEnter={(info) => {
          eventSelected.current = info.event
          setAnchorEl(info.el)
        }}
        eventMouseLeave={() => {
          setAnchorEl(null)
        }}
        eventContent={PlaceScheduleEventContent}
      />
    </DashboardContainer>
  )
}

export default RoutesSchedule
