<script>
  import { onMount } from 'svelte'
  import { Datatable, rows } from 'svelte-simple-datatables'
  import { debug, data, simple_datatables_settings, pagetitle } from '../../stores.js'
  import api from '../../api'

  let tabledata = []

  onMount( async () => {
    $pagetitle = 'Teljesítmény % (havi lezárt)'
    const dolgozokod = data.user.belepokod || -1
    const sql = `select top 60 [Dolgozó kód], [Dátum], [Teljesítmény %] from monitor_havilezartteljesitmeny where [Dolgozó kód] = ${dolgozokod} order by [Év] desc, [Hónap] desc`
    const result = await api.post({url: '/local/tir/query', params: {sql: sql}})
    tabledata = result
  })

</script>

<div class="simple-datatables-full-height" >
  <Datatable settings={simple_datatables_settings} data={tabledata}>
    <thead>
      <th data-key="Dátum">Dátum</th>
      <th data-key="Teljesítmény %">Teljesítmény %</th>
    </thead>
    <tbody>
    {#each $rows as row}
      <tr>
        <td>{row['Dátum']}</td>
        <td class="text-right">{row['Teljesítmény %']}</td>
      </tr>
    {/each}
    </tbody>
  </Datatable>
</div>
