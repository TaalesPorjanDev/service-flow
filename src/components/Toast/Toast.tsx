import React from 'react'
import './toast.css'

type ToastItem = { id: number; message: string; type: 'success' | 'error' }

export const Toast: React.FC<{ items: ToastItem[] }> = ({ items }) => {
  return (
    <div className="toast-container">
      {items.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  )
}
