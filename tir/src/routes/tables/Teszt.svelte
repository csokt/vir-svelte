<script>
  import { onMount } from 'svelte'
  import { Datatable, rows } from 'svelte-simple-datatables'
  import { debug, data, simple_datatables_settings } from '../../stores.js'
  import api from '../../api'

  let tabledata = []

  onMount( async () => {
    const dolgozokod = data.user.belepokod || 0
    const sql = `select top 300 [Dolgozó kód], [Dátum], [Teljesítmény %] from monitor_napiteljesitmeny where [Dolgozó kód] = ${dolgozokod} order by [Dátum] desc`
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
        <td>{row['Dátum'].substring(0,10)}</td>
        <td class="text-right">{row['Teljesítmény %']}</td>
      </tr>
    {/each}
    </tbody>
  </Datatable>
</div>
