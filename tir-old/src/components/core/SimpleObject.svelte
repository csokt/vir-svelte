<script>
  import { createEventDispatcher } from 'svelte'
  import { Textfield } from 'svelte-mui'

  export let data
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
      on:click={() => { dispatch('select', {field: _field.field, value: data[_field.field]}) }}
    />
  {/each}
</div>
