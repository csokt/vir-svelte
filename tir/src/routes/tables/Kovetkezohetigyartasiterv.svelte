<script>
  import { onMount } from 'svelte'
  import { Datatable, rows } from 'svelte-simple-datatables'
  import { debug, data, simple_datatables_settings, pagetitle } from '../../stores.js'
  import api from '../../api'
  import Spinner from '../../components/core/Spinner.svelte'

  let spinner = true

  let tablewidth = 'w-11/12'
  let tabledata = [{
    'Cikkszám': '',
    'IT szám': '',
    'Szín': '',
    'Kiszállítás dátuma': '',
    'Megnevezés': '',
    'Sürgős': '',
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
    'Orosháza varroda': '',
    'Hódmezővásárhely Petőfi u': '',
  }]

  let osszesen = {
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
    'Orosháza varroda': '',
    'Hódmezővásárhely Petőfi u': '',
  }

  onMount( async () => {
    $pagetitle = 'Gyártási terv - következő hét'
    const sql = `select top 500 * from monitor_kovetkezohetigyartasiterv order by [Cikkszám], [IT szám], [Szín]`
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
      <th data-key="IT szám">IT</th>
      <th data-key="Szín">Szín</th>
      <th data-key="Kiszállítás dátuma">Kiszállítás<br>dátuma</th>
      <th data-key="Megnevezés">Megnevezés</th>
      <th data-key="Sürgős">Sürgős</th>
      <th data-key="Gyártandó mennyiség">Gyár-<br>tandó</th>
      <th data-key="Gyártásra vár">Gyárt.<br>vár</th>
      <th data-key="Átnéző">Átn.</th>
      <th data-key="Mosoda">Mos.</th>
      <th data-key="Fércelő">Férc.</th>
      <th data-key="Félkész vasaló">Félkész<br>vas.</th>
      <th data-key="Szabászat">Szab.</th>
      <th data-key="Logisztika">Log.</th>
      <th data-key="Hímző/Szitanyomó">Hímző</th>
      <th data-key="Szeged varroda">Szeged<br>varr.</th>
      <th data-key="Orosháza varroda">Orosh.<br>varr.</th>
      <th data-key="Hódmezővásárhely Petőfi u">Hmvh.<br>varr.</th>
    </thead>
    <tbody>
      <tr class="text-blue-700" >
        <td>Összesen</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>{osszesen['Gyártandó mennyiség']}</td>
        <td>{osszesen['Gyártásra vár']}</td>
        <td>{osszesen['Átnéző']}</td>
        <td>{osszesen['Mosoda']}</td>
        <td>{osszesen['Fércelő']}</td>
        <td>{osszesen['Félkész vasaló']}</td>
        <td>{osszesen['Szabászat']}</td>
        <td>{osszesen['Logisztika']}</td>
        <td>{osszesen['Hímző/Szitanyomó']}</td>
        <td>{osszesen['Szeged varroda']}</td>
        <td>{osszesen['Orosháza varroda']}</td>
        <td>{osszesen['Hódmezővásárhely Petőfi u']}</td>
      </tr>
    {#each $rows as row}
      <tr>
        <td>{row['Cikkszám']}</td>
        <td>{row['IT szám']}</td>
        <td>{row['Szín']}</td>
        <td>{row['Kiszállítás dátuma']}</td>
        <td class="textleft">{row['Megnevezés']}</td>
        <td>{row['Sürgős']}</td>
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
        <td>{row['Orosháza varroda']}</td>
        <td>{row['Hódmezővásárhely Petőfi u']}</td>
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