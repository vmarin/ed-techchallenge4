import { format } from 'date-fns'

export function formatDate(isoDateString: string): string {
  try {
    return format(new Date(isoDateString), 'dd/MM/yyyy')
  } catch (error) {
    console.error('Erro ao formatar data:', error)
    return ''
  }
}