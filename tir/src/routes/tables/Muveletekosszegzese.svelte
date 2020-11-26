<script>
  import { onMount } from 'svelte'
  import { Datatable, rows } from 'svelte-simple-datatables'
  import { debug, data, simple_datatables_settings, pagetitle } from '../../stores.js'
  import api from '../../api'

  export let cikkszam = data.munkalap.cikkszam || -1

  let tablewidth = 'w-11/12'
  let tabledata = [{
    'Cikkszám': '',
    'IT': '',
    'Művelet': '',
    'Megnevezés': '',
    'darab': '',
  }]

  onMount( async () => {
    $pagetitle = 'Bekódolt műveletek összegzése'
    const sql = `select top 500 * from monitor_muveletekosszegzese where [Cikkszám] = '${cikkszam}' order by [Művelet], [IT]`
    const result = await api.post({url: '/local/tir/query', params: {sql: sql}})
    tabledata = result
    tablewidth = 'w-full'
  })

</script>

<div class="simple-datatables-full-height {tablewidth}">
  <Datatable settings={simple_datatables_settings} data={tabledata}>
    <thead>
      <th data-key="Cikkszám">Cikkszám</th>
      <th data-key="IT">IT</th>
      <th data-key="Művelet">Művelet</th>
      <th data-key="Megnevezés">Megnevezés</th>
      <th data-key="darab">Összes bekódolt db</th>
    </thead>
    <tbody>
    {#each $rows as row}
      <tr>
        <td>{row['Cikkszám']}</td>
        <td>{row['IT']}</td>
        <td>{row['Művelet']}</td>
        <td class="textleft">{row['Megnevezés']}</td>
        <td>{row['darab']}</td>
      </tr>
    {/each}
    </tbody>
  </Datatable>
</div>

<style>
  .textleft{
    text-align:left;
  }
</style>