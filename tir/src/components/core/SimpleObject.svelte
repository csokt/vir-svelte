<script>
  import { createEventDispatcher } from 'svelte'
  import TextField from "smelte/src/components/TextField"

  export let data
  export let fields

  $: _fields = fields || Object.keys(data || {}).map(i => ({ label: (i || "").replace("_", " "), field: i }))

  const dispatch = createEventDispatcher()
</script>

<div>
  {#each _fields as _field, i}
    <TextField
      dense
      label={_field.label}
      value={data[_field.field]}
      readonly={true}
    />
  {/each}
</div>
