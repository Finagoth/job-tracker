import { useEffect } from 'react'

export function usePageTitle(title: string) {
    useEffect(() => {
        document.title = `${title} | Job Tracker`

        // Restaura o título padrão quando o componente sai da tela.
        return () => {
            document.title = 'Job Tracker'
        }
    }, [title])
}