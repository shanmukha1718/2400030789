import { useEffect, useState } from 'react'
import './App.css'
import Calendar from './components/Calendar'
import EventForm from './components/EventForm'
import EventCard from './components/EventCard'
import { load, save } from './utils/storage'
import { format } from 'date-fns'

type EventItem = { id:string; date:string; title:string; description?:string }

function App(){
  const [events, setEvents] = useState<EventItem[]>(() => load('events') || [])
  const [selected, setSelected] = useState<string>(format(new Date(), 'yyyy-MM-dd'))

  useEffect(()=>{
    save('events', events)
  },[events])

  const addEvent = (ev:{title:string, description?:string, date:string}) => {
    const item:EventItem = { id:Date.now().toString(), ...ev }
    setEvents(prev => [...prev, item])
  }

  const dayEvents = events.filter(e => e.date === selected)

  return (
    <div style={{padding:20,maxWidth:900,margin:'0 auto'}}>
      <h1>Interactive Calendar</h1>
      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:20}}>
        <Calendar events={events} onDayClick={(d)=>setSelected(format(d,'yyyy-MM-dd'))} />
        <div>
          <h3>Events on {selected}</h3>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {dayEvents.length===0 && <div>No events</div>}
            {dayEvents.map(ev=> <EventCard key={ev.id} title={ev.title} description={ev.description} />)}
          </div>
          <hr style={{margin:'12px 0'}}/>
          <h4>Add event</h4>
          <EventForm date={selected} onAdd={addEvent} />
        </div>
      </div>
    </div>
  )
}

export default App
