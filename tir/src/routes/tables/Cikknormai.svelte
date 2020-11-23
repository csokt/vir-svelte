<script>
  import { onMount } from 'svelte'
  import { Datatable, rows } from 'svelte-simple-datatables'
  import { debug, data, simple_datatables_settings, pagetitle } from '../../stores.js'
  import api from '../../api'

  export let cikkszam = data.munkalap.cikkszam || 25026

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
    const sql = `select top 500 * from monitor_cikknormai where [Cikkszám] = ${cikkszam} order by [Műveletkód]`
    const result = await api.post({url: '/local/tir/query', params: {sql: sql}})
    tabledata = result
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
        <td>{row['Cikkszám']}</td>
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
</div>

<style>
  .textleft{
    text-align:left;
  }
</style>