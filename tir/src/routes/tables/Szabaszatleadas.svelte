<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import { Datatable, rows } from 'svelte-simple-datatables'
  import { debug, data, simple_datatables_settings, pagetitle } from '../../stores.js'
  import api from '../../api'
  import Spinner from '../../components/core/Spinner.svelte'

	const dispatch = createEventDispatcher()
  let spinner = true

  let tablewidth = 'w-11/12'
  let tabledata = [{
    'Cikkszám': '',
    'IT': '',
    'Megnevezés': '',
    'Megrendelő': '',
    'Rendelt db': '',
    'Előzőleg leadott db': '',
    'Hátralék': '',
    'Tervezett db': '',
    'Leadott db': '',
    'Eltérés a tervtől': '',
    'Hibák száma': '',
  }]

  let osszesen = {
    'Rendelt db': '',
    'Előzőleg leadott db': '',
    'Hátralék': '',
    'Tervezett db': '',
    'Leadott db': '',
    'Eltérés a tervtől': '',
    'Hibák száma': '',
  }

  onMount( async () => {
    $pagetitle = 'Szeged szabászat napi leadás'
    api.log('Oldal', $pagetitle)
    const sql = `select top 500 * from monitor_szegedszabaszatleadas order by [Cikkszám]`
    const result = await api.post({url: '/local/tir/query', params: {sql: sql}})
    for (const field in osszesen) {
      osszesen[field] = Math.round( result.reduce(( acc, curr ) => { return acc + curr[field] }, 0))
    }
    tabledata = result
    spinner=false
    tablewidth = 'w-full'
  })
</script>

<div class="simple-datatables-full-height {tablewidth}">
  <Datatable settings={simple_datatables_settings} data={tabledata}>
    <thead>
      <th data-key="Cikkszám">Cikk</th>
      <th data-key="IT">IT szám</th>
      <th data-key="Megnevezés">Megnevezés</th>
      <th data-key="Megrendelő">Megrendelő</th>
      <th data-key="Rendelt db">Rendelt</th>
      <th data-key="Előzőleg leadott db">Előzőleg<br>leadott</th>
      <th data-key="Hátralék">Gyártandó</th>
      <th data-key="Tervezett db">Mai<br>terv</th>
      <th data-key="Leadott db">Ma<br>leadott</th>
      <th data-key="Eltérés a tervtől">Eltérés</th>
      <th data-key="Hibák száma">Hibák</th>
    </thead>
    <tbody>
      <tr class="text-blue-700" >
        <td>Összesen</td>
        <td></td>
        <td></td>
        <td></td>
        <td>{osszesen['Rendelt db']}</td>
        <td>{osszesen['Előzőleg leadott db']}</td>
        <td>{osszesen['Hátralék']}</td>
        <td>{osszesen['Tervezett db']}</td>
        <td>{osszesen['Leadott db']}</td>
        <td>{osszesen['Eltérés a tervtől']}</td>
        <td>{osszesen['Hibák száma']}</td>
      </tr>
    {#each $rows as row}
      <tr>
        <td class="text-blue-800" on:click={e => dispatch('seasearch', row['Cikkszám'])}>{row['Cikkszám']}</td>
        <td>{row['IT']}</td>
        <td class="textleft">{row['Megnevezés']}</td>
        <td>{row['Megrendelő']}</td>
        <td>{row['Rendelt db']}</td>
        <td>{row['Előzőleg leadott db']}</td>
        <td class:text-red-700="{row['Hátralék']>0}">{row['Hátralék']}</td>
        <td>{row['Tervezett db']}</td>
        <td>{row['Leadott db']}</td>
        <td class:text-red-700="{row['Eltérés a tervtől']<0}">{row['Eltérés a tervtől']}</td>
        <td>{row['Hibák száma']}</td>
      </tr>
    {/each}
    </tbody>
  </Datatable>
  <Spinner active={spinner}/>
</div>

<style>
  .textleft{
    text-align:left;
  }
</style>