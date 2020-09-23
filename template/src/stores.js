import { writable } from 'svelte/store'

export const pagetitle = writable('Page title')
export const userinfo = writable({})