import React, { useState } from 'react'
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, isSameMonth } from 'date-fns'
import styles from './Calendar.module.css'

type EventItem = {
  id: string
  date: string // ISO date
  title: string
  description?: string
}

export default function Calendar({ events, onDayClick }: { events: EventItem[]; onDayClick: (date: Date) => void }) {
  const [current, setCurrent] = useState(new Date())

  const start = startOfMonth(current)
  const end = endOfMonth(current)
  const days = eachDayOfInterval({ start, end })

  const prevMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1))
  const nextMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1))

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={prevMonth}>&lt;</button>
        <h2>{format(current, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className={styles.grid}>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className={styles.weekday}>{d}</div>
        ))}
        {days.map(day => {
          const iso = format(day, 'yyyy-MM-dd')
          const dayEvents = events.filter(e => e.date === iso)
          return (
            <div key={iso} className={styles.day + ' ' + (isSameDay(day, new Date()) ? styles.today : '')} onClick={() => onDayClick(day)}>
              <div className={styles.dayNum}>{format(day, 'd')}</div>
              <div className={styles.eventDots}>
                {dayEvents.slice(0,3).map(ev => (<span key={ev.id} className={styles.dot} title={ev.title}></span>))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
