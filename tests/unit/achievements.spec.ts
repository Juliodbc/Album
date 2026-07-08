import { describe, expect, it } from 'vitest'
import { getAchievements } from '@/utils/achievements'

describe('getAchievements', () => {
  it('marca conquistas conforme o progresso da coleção', () => {
    const achievements = getAchievements(18, 3)

    expect(achievements[0]).toMatchObject({
      title: 'Primeira figurinha',
      achieved: true,
      progress: 3,
      target: 1
    })

    expect(achievements[1]).toMatchObject({
      title: 'Colecionador iniciante',
      achieved: false,
      progress: 3,
      target: 5
    })
  })

  it('marca a coleção completa quando todas as figurinhas forem coletadas', () => {
    const achievements = getAchievements(18, 18)

    expect(achievements[3]).toMatchObject({
      title: 'Coleção completa',
      achieved: true,
      progress: 18,
      target: 18
    })
  })
})
