import { writable } from 'svelte/store'

export const debug = true
export const data = { user: {}, kodol: {}, munkalap: {} }

export const simple_datatables_settings = {
  sortable: true,
  pagination: true,
  rowPerPage: 50,
  columnFilter: false,
  scrollY: true,
  css: true,
  labels: {
    search: 'Keresés...',
    filter: 'Szűrő',
    noRows: 'Nincs adat',
    info: 'Sorok: {start}-{end}, összesen: {rows}',
    previous: 'Előző',
    next: 'Következő',
  },
  blocks: {
    searchInput: true,
    paginationButtons: true,
    paginationRowCount: true,
  }
}

export const snackbar = writable({})
export const facingmode = writable('')
export const pagetitle = writable('Page title')
export const userinfo = writable({})