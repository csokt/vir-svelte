<script>
  import { onMount } from 'svelte'
  import { Datatable, rows } from 'svelte-simple-datatables'
  import { debug, data, simple_datatables_settings, pagetitle } from '../../stores.js'
  import api from '../../api'
  import Spinner from '../../components/core/Spinner.svelte'

  let spinner = true

  export let munkalapazonosito = data.munkalap.munkalapazonosito || -1

  let tablewidth = 'w-11/12'
  let tabledata = [{
    'Üzemnév': '',
    'Munkalap kód': '',
    'Cikk': '',
    'IT': '',
    'Diszpó': '',
    'Szín': '',
    'csomag': '',
    'Méret': '',
    'darab': '',
    'Művelet': '',
    'Művelet név': '',
    'Norma perc': '',
    'Dolgozó név': '',
    'Kódolás ideje': '',
    'Kódoló': '',
  }]

  onMount( async () => {
    $pagetitle = 'Kódolások a munkalapon'
    const sql = `select top 500 * from monitor_kodolasok where [Munkalap kód] = ${munkalapazonosito} order by [Üzemkód], [Művelet], [Kódolás ideje]`
    const result = await api.post({url: '/local/tir/query', params: {sql: sql}})
    tabledata = result
    spinner=false
    tablewidth = 'w-full'
  })

</script>

<div class="simple-datatables-full-height {tablewidth}">
  <Datatable settings={simple_datatables_settings} data={tabledata}>
    <thead>
      <th data-key="Üzemnév">Üzemnév</th>
      <th data-key="Munkalap kód">Munkalap</th>
      <th data-key="Cikk">Cikk</th>
      <th data-key="IT">IT szám</th>
      <th data-key="Diszpó">Diszpó</th>
      <th data-key="Szín">Szín</th>
      <th data-key="csomag">Csomag</th>
      <th data-key="Méret">Méret</th>
      <th data-key="darab">Darab</th>
      <th data-key="Művelet">Művelet</th>
      <th data-key="Művelet név">Művelet név</th>
      <th data-key="Norma perc">Norma perc</th>
      <th data-key="Dolgozó név">Dolgozó név</th>
      <th data-key="Kódolás ideje">Kódolás ideje</th>
      <th data-key="Kódoló">Kódoló</th>
    </thead>
    <tbody>
    {#each $rows as row}
      <tr>
        <td>{row['Üzemnév']}</td>
        <td>{row['Munkalap kód']}</td>
        <td>{row['Cikk']}</td>
        <td>{row['IT']}</td>
        <td>{row['Diszpó']}</td>
        <td>{row['Szín']}</td>
        <td>{row['csomag']}</td>
        <td>{row['Méret']}</td>
        <td>{row['darab']}</td>
        <td>{row['Művelet']}</td>
        <td class="textleft">{row['Művelet név']}</td>
        <td>{row['Norma perc']}</td>
        <td>{row['Dolgozó név']}</td>
        <td>{row['Kódolás ideje'].substring(0,10)+' '+row['Kódolás ideje'].substring(11,19)}</td>
        <td>{row['Kódoló']}</td>
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