import { mount } from '@vue/test-utils'
import AlbumPage from '@/views/AlbumPage.vue'
import { describe, expect, test } from 'vitest'

describe('AlbumPage.vue', () => {
  test('renders album title', () => {
    const wrapper = mount(AlbumPage)
    expect(wrapper.text()).toMatch('Meu Álbum')
  })
})
