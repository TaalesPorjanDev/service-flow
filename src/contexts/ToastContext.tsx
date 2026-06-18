import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Toast } from '../components/Toast/Toast'

type ToastContextType = {
  showSuccess: (message: string) => void
  showError: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

let globalShowSuccess: ((m: string) => void) | null = null
let globalShowError: ((m: string) => void) | null = null

export function toastShowSuccess(message: string) {
  if (globalShowSuccess) globalShowSuccess(message)
}
export function toastShowError(message: string) {
  if (globalShowError) globalShowError(message)
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<{ id: number; message: string; type: 'success' | 'error' }[]>([])

  const push = useCallback((message: string, type: 'success' | 'error') => {
    const id = Date.now() + Math.random()
    setItems((s) => [...s, { id, message, type }])
    setTimeout(() => {
      setItems((s) => s.filter((i) => i.id !== id))
    }, 4000)
  }, [])

  const showSuccess = useCallback((message: string) => push(message, 'success'), [push])
  const showError = useCallback((message: string) => push(message, 'error'), [push])

  useEffect(() => {
    globalShowSuccess = showSuccess
    globalShowError = showError
    return () => {
      globalShowSuccess = null
      globalShowError = null
    }
  }, [showSuccess, showError])

  return (
    <ToastContext.Provider value={{ showSuccess, showError }}>
      {children}
      <Toast items={items} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
