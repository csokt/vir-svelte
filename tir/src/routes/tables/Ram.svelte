<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import { Datatable, rows } from 'svelte-simple-datatables'
  import Spinner from '../../components/core/Spinner.svelte'
  import api from '../../api'
  import { debug, data, simple_datatables_settings, pagetitle } from '../../stores.js'
  import common from '../../config/common'

  const dispatch = createEventDispatcher()
  let spinner = true

  let tablewidth = 'w-11/12'
  let tabledata = [{
    'Cikkszám': '',
    'IT szám': '',
    'Megnevezés': '',
    'Sürgős': '',
    'Rendelt mennyiség': '',
    'Szín': '',
    'Gyártandó mennyiség': '',
    'Gyártásra vár': '',
    'Átnéző': '',
    'Mosoda': '',
    'Fércelő': '',
    'Félkész vasaló': '',
    'Szabászat': '',
    'Logisztika': '',
    'Hímző/Szitanyomó': '',
    'Szeged varroda': '',
  }]

  onMount( async () => {
    $pagetitle = 'Rendelés állapot monitor'
    await api.log('Oldal', $pagetitle)
    const sql = `select top 500 * from monitor_ramviewtablet order by [Cikkszám], [Ütem]`
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
      <th data-key="IT szám">IT szám</th>
      <th data-key="Megnevezés">Megnevezés</th>
      <th data-key="Sürgős">Sürgős</th>
      <th data-key="Rendelt mennyiség">Rendelt mennyiség</th>
      <th data-key="Szín">Szín</th>
      <th data-key="Gyártandó mennyiség">Gyártandó mennyiség</th>
      <th data-key="Gyártásra vár">Gyártásra vár</th>
      <th data-key="Átnéző">Átnéző</th>
      <th data-key="Mosoda">Mosoda</th>
      <th data-key="Fércelő">Fércelő</th>
      <th data-key="Félkész vasaló">Félkész vasaló</th>
      <th data-key="Szabászat">Szabászat</th>
      <th data-key="Logisztika">Logisztika</th>
      <th data-key="Hímző/Szitanyomó">Hímző/Szitanyomó</th>
      <th data-key="Szeged varroda">Szeged varroda</th>
    </thead>
    <tbody>
    {#each $rows as row}
      <tr>
        <td>{row['Cikkszám']}</td>
        <td>{row['IT szám']}</td>
        <td>{row['Megnevezés']}</td>
        <td>{row['Sürgős']}</td>
        <td>{row['Rendelt mennyiség']}</td>
        <td>{row['Szín']}</td>
        <td>{row['Gyártandó mennyiség']}</td>
        <td>{row['Gyártásra vár']}</td>
        <td>{row['Átnéző']}</td>
        <td>{row['Mosoda']}</td>
        <td>{row['Fércelő']}</td>
        <td>{row['Félkész vasaló']}</td>
        <td>{row['Szabászat']}</td>
        <td>{row['Logisztika']}</td>
        <td>{row['Hímző/Szitanyomó']}</td>
        <td>{row['Szeged varroda']}</td>
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