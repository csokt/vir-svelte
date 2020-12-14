<script>
  import { createEventDispatcher } from 'svelte'
  import { Textfield } from 'svelte-mui'

  export let data
  export let selected
  export let fields

  $: _fields = fields || Object.keys(data || {}).map(i => ({ label: (i || "").replace("_", " "), field: i }))

  const dispatch = createEventDispatcher()
</script>

<div>
  {#each _fields as _field, i}
    <Textfield
      dense
      label={_field.label}
      value={data[_field.field]}
      readonly={true}
      on:click={() => { selected = {field: _field.field, label: _field.label, value: data[_field.field]}; dispatch('select') }}
    />
  {/each}
</div>
