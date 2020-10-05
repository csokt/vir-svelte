import { writable } from 'svelte/store'

export const debug = true
export const facingmode = writable('')
export const pagetitle = writable('Page title')
export const userinfo = writable({})