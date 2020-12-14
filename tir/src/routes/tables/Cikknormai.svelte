<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import { Datatable, rows } from 'svelte-simple-datatables'
  import { debug, data, simple_datatables_settings, pagetitle } from '../../stores.js'
  import api from '../../api'
  import Spinner from '../../components/core/Spinner.svelte'

	const dispatch = createEventDispatcher()
  let spinner = true

  export let cikkszam = data.munkalap.cikkszam || -1

  let tablewidth = 'w-11/12'
  let tabledata = [{
    'Cikkszám': '',
    'Műveletkód': '',
    'Megnevezés': '',
    'Normaperc': '',
    'Előkészítő': '',
    'Normatípus': '',
    'Gép': '',
  }]

  onMount( async () => {
    $pagetitle = 'Konfekció normalapok'
    const sql = `select top 500 * from monitor_cikknormai where [Cikkszám] = '${cikkszam}' order by [Műveletkód]`
    const result = await api.post({url: '/local/tir/query', params: {sql: sql}})
    tabledata = result
    spinner=false
    tablewidth = 'w-full'
  })

</script>

<div class="simple-datatables-full-height {tablewidth}">
  <Datatable settings={simple_datatables_settings} data={tabledata}>
    <thead>
      <th data-key="Cikkszám">Cikkszám</th>
      <th data-key="Műveletkód">Műveletkód</th>
      <th data-key="Megnevezés">Megnevezés</th>
      <th data-key="Normaperc">Normaperc</th>
      <th data-key="Előkészítő">Előkészítő</th>
      <th data-key="Normatípus">Normatípus</th>
      <th data-key="Gép">Gép neve</th>
    </thead>
    <tbody>
    {#each $rows as row}
      <tr>
        <td class="text-blue-800" on:click={e => dispatch('seasearch', row['Cikkszám'])}>{row['Cikkszám']}</td>
        <td>{row['Műveletkód']}</td>
        <td class="textleft">{row['Megnevezés']}</td>
        <td>{row['Normaperc']}</td>
        <td>{row['Előkészítő']}</td>
        <td>{row['Normatípus']}</td>
        <td>{row['Gép']}</td>
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