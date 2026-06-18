export function formatarData(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

export function formatarDataSomente(isoOrDate: string): string {
  // Aceita vários formatos: YYYY-MM-DD, YYYY-MM-DDTHH:mm, DD-MM-YYYY, timestamp
  if (!isoOrDate) return ''

  // Se já está no formato DD-MM-YYYY, retorna direto
  if (/^\d{2}-\d{2}-\d{4}$/.test(isoOrDate)) return isoOrDate

  // Extrair parte de data se vier com horário
  const datePart = isoOrDate.split(' ')[0]

  // Se estiver no formato YYYY-MM-DD (ou YYYY-M-D), inverte
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(datePart)) {
    const [y, m, d] = datePart.split('-')
    const dd = String(Number(d)).padStart(2, '0')
    const mm = String(Number(m)).padStart(2, '0')
    return `${dd}-${mm}-${y}`
  }

  // Tentativa genérica: usar Date e formatar
  try {
    const d = new Date(isoOrDate)
    if (Number.isNaN(d.getTime())) return isoOrDate
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = String(d.getFullYear())
    return `${dd}-${mm}-${yyyy}`
  } catch {
    return isoOrDate
  }
}

export function normalizarParaIsoDate(value: string): string {
  if (!value) return ''

  // Já no formato ISO YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value

  // Se estiver no formato DD-MM-YYYY -> converter
  if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    const [d, m, y] = value.split('-')
    return `${y}-${m}-${d}`
  }

  // Tentar extrair parte de data de strings com horário
  const parts = value.split(' ')[0]
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(parts)) {
    const [y, m, d] = parts.split('-')
    const mm = String(Number(m)).padStart(2, '0')
    const dd = String(Number(d)).padStart(2, '0')
    return `${y}-${mm}-${dd}`
  }

  // Fallback: tentar criar Date
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
