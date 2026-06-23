export function fieldClass(hasError: boolean) {
  return [
    'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 transition-colors focus:outline-none focus:ring-2',
    hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20',
  ].join(' ')
}
