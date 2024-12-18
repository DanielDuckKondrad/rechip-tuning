import { defineStore } from 'pinia'
import type { Contact, Homepage } from '@/src/types/ui'
// import { useRuntimeConfig } from '#imports'

// const host = window.location.hostname

// console.log(host)
interface GoodsState {
  lang: 'ru' | 'en',
  regions: {name: string, place: string, code: string, web: string}[]
  activeRegion: number
  contacts: Contact[]
  homepage: null | Homepage
}

export const useUiStore = defineStore('ui', {
  state: (): GoodsState => ({
    lang: 'ru',
    regions: [
      { name: 'Санкт-Петербург', place: 'Санкт-Петербурге', code: 'spb', web: 'https://spb.rechip-tuning.ru' },
      { name: 'Москва', place: 'Москве', code: 'msk', web: 'https://msk.rechip-tuning.ru/' }
      // { name: 'Гатчина', place: 'Гатчине', code: 'gtn', web: 'https://spb.rechip-tuning.ru' },
      // { name: 'Нижний Новгород', place: 'Нижнем Новгороде', code: 'nng', web: 'https://spb.rechip-tuning.ru' },
      // { name: 'Ейск', place: 'Ейске', code: 'ysk', web: 'https://spb.rechip-tuning.ru' }
    ],
    activeRegion: 0,
    // activeRegion: Number(useRuntimeConfig().public.activeCity),
    contacts: [],
    homepage: null
  }),
  getters: {
    getCurrentRegion (state) {
      return state.contacts.find(i => i.region_name === state.regions[state.activeRegion].name)
    }
  },
  actions: {
    SET_REGION (region: number) {
      this.activeRegion = region
    },
    async LOAD_CONTACTS () {
      const { data } = await useFetch<Contact[]>('https://api.rechip-tuning.ru/api/page?slug=contacts')
      if (data.value) {
        this.contacts = data.value
      }
    },
    async LOAD_HOMEPAGE () {
      const { data } = await useFetch<Homepage>('https://api.rechip-tuning.ru/api/page?slug=main')
      if (data.value) {
        this.homepage = data.value
      }
    }
  }
})
