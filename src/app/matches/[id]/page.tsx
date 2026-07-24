import MatchDetailClient from './MatchDetailClient'

export function generateStaticParams() {
  return [
    { id: 'match-1' },
    { id: 'match-2' },
    { id: 'match-3' },
    { id: 'match-4' },
  ]
}

export default function MatchDetailPage() {
  return <MatchDetailClient />
}