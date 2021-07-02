<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import { Datatable, rows } from 'svelte-simple-datatables'
  import { debug, data, simple_datatables_settings, pagetitle } from '../../stores.js'
  import api from '../../api'
  import Spinner from '../../components/core/Spinner.svelte'

  const dispatch = createEventDispatcher()
  let spinner = true

  export let dolgozokod = data.user.belepokod || -1

  let tablewidth = 'w-11/12'
  let tabledata = [{
    'Cikkszám': '',
    'IT': '',
    'Diszpó': '',
    'Szín': '',
    'csomag': '',
    'Méret': '',
    'darab': '',
    'Művelet': '',
    'Művelet név': '',
    'Normaperc': '',
    'Összes Normaperc': '',
    'Megjegyzés': '',
    'Dolgozó': '',
    'Kódolás ideje': '',
  }]

  onMount( async () => {
    $pagetitle = 'Mit kódoltam ma?'
    await api.log('Oldal', $pagetitle)
    const sql = `select top 500 * from monitor_napikodolas where [Kódoló kód] = ${dolgozokod} order by [Kódolás ideje] desc`
    const result = await api.post({url: '/local/tir/query', expect: 'array', params: {sql: sql}})
    tabledata = result
    spinner=false
    tablewidth = 'w-full'
  })

</script>

<div class="simple-datatables-full-height {tablewidth}">
  <Datatable settings={simple_datatables_settings} data={tabledata}>
    <thead>
      <th data-key="Cikkszám">Cikkszám</th>
      <th data-key="IT">IT</th>
      <th data-key="Diszpó">Diszpó</th>
      <th data-key="Szín">Szín</th>
      <th data-key="csomag">Csomag</th>
      <th data-key="Méret">Méret</th>
      <th data-key="darab">Darab</th>
      <th data-key="Művelet">Művelet</th>
      <th data-key="Művelet név">Művelet név</th>
      <th data-key="Normaperc">Norma<br>perc</th>
      <th data-key="Összes Normaperc">Összes<br>normaperc</th>
      <th data-key="Megjegyzés">Megjegyzés</th>
      <th data-key="Dolgozó">Dolgozó</th>
      <th data-key="Kódolás ideje">Kódolás ideje</th>
    </thead>
    <tbody>
    {#each $rows as row}
      <tr>
        <td class="text-blue-800" on:click={e => dispatch('seasearch', row['Cikkszám'])}>{row['Cikkszám']}</td>
        <td>{row['IT']}</td>
        <td>{row['Diszpó']}</td>
        <td>{row['Szín']}</td>
        <td>{row['csomag']}</td>
        <td>{row['Méret']}</td>
        <td>{row['darab']}</td>
        <td>{row['Művelet']}</td>
        <td class="textleft">{row['Művelet név']}</td>
        <td>{row['Normaperc']}</td>
        <td>{row['Összes Normaperc']}</td>
        <td>{row['Megjegyzés']}</td>
        <td>{row['Dolgozó']}</td>
        <td>{row['Kódolás ideje'].substring(0,10)+' '+row['Kódolás ideje'].substring(11,19)}</td>
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