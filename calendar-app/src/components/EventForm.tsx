import React, { useState } from 'react'

export default function EventForm({date, onAdd}:{date:string, onAdd:(ev:{title:string, description?:string, date:string})=>void}){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const submit = (e:React.FormEvent) => {
    e.preventDefault()
    if(!title) return
    onAdd({title, description, date})
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:8}}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Event title" />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description (optional)" />
      <button type="submit">Add Event</button>
    </form>
  )
}
