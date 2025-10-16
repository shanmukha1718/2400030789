import React from 'react'
import styles from './EventCard.module.css'

export default function EventCard({title, description}:{title:string, description?:string}){
  return (
    <div className={styles.card}>
      <strong>{title}</strong>
      {description && <div className={styles.desc}>{description}</div>}
    </div>
  )
}
