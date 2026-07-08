export interface Achievement {
  title: string
  description: string
  target: number
  progress: number
  achieved: boolean
}

export function getAchievements(total: number, collected: number) {
  const progress = Math.min(collected, total)

  return [
    {
      title: 'Primeira figurinha',
      description: 'Colete sua primeira figurinha.',
      target: 1,
      progress,
      achieved: progress >= 1
    },
    {
      title: 'Colecionador iniciante',
      description: 'Complete 5 figurinhas.',
      target: 5,
      progress,
      achieved: progress >= 5
    },
    {
      title: 'Colecionador dedicado',
      description: 'Complete 10 figurinhas.',
      target: 10,
      progress,
      achieved: progress >= 10
    },
    {
      title: 'Coleção completa',
      description: 'Colete todas as figurinhas.',
      target: total,
      progress,
      achieved: progress >= total
    }
  ]
}
