import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react'

export default function MeetingCalendar() {
  const [events, setEvents] = useState([
    { title: 'Investor Meeting', date: '2026-06-01' },
    { title: 'Demo Call', date: '2026-06-05' }
  ])

  const handleDateClick = (arg: { dateStr: string }) => {
    const title = prompt('Meeting ka naam likho:')
    if (title) {
      setEvents([...events, { title, date: arg.dateStr }])
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>📅 Meeting Schedule</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events}
        dateClick={handleDateClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
      />
    </div>
  )
}