<script>
  import { createEventDispatcher } from 'svelte'
  import { Button, Dialog, Icon, Textfield } from 'svelte-mui'
  import { facingmode } from '../../stores.js'
  import QrScanner from './QrScanner.svelte'

  const dispatch = createEventDispatcher()

  export let title = ''
  export let showDialog = false

  export let value = ''
  export let label = ''
  export let disabled = false
  export let readonly = null
  export let error = false
  export let attributes = {}

  function onScanned(event) {
    value = event.detail
    dispatch('change', value)
    showDialog = false
  }
</script>

<Dialog
  bind:visible={showDialog}
  width="372"
  modal
>
  <div slot="title">
    <span on:click={() => showDialog = false}>&#9668;</span>
    {title}
  </div>

  {#if showDialog}
    <QrScanner
      facingmode={$facingmode}
      on:scanned={onScanned}
    />
  {/if}
</Dialog>

<div class="flex flex-row">
  <Textfield
    dense
    {label}
    bind:value={value}
    {disabled}
    {readonly}
    {error}
    append={readonly ? '' : 'select_all'}
    {...attributes}
    on:click-append={() => showDialog = true}
    on:change
  />
  <Icon class="self-center"
    path="M7.5 1.5h-6v6h6v-6zM9 0v0 9h-9v-9h9zM3 3h3v3h-3zM22.5 1.5h-6v6h6v-6zM24 0v0 9h-9v-9h9zM18 3h3v3h-3zM7.5 16.5h-6v6h6v-6zM9 15v0 9h-9v-9h9zM3 18h3v3h-3zM10.5 0h1.5v1.5h-1.5zM12 1.5h1.5v1.5h-1.5zM10.5 3h1.5v1.5h-1.5zM12 4.5h1.5v1.5h-1.5zM10.5 6h1.5v1.5h-1.5zM12 7.5h1.5v1.5h-1.5zM10.5 9h1.5v1.5h-1.5zM10.5 12h1.5v1.5h-1.5zM12 13.5h1.5v1.5h-1.5zM10.5 15h1.5v1.5h-1.5zM12 16.5h1.5v1.5h-1.5zM10.5 18h1.5v1.5h-1.5zM12 19.5h1.5v1.5h-1.5zM10.5 21h1.5v1.5h-1.5zM12 22.5h1.5v1.5h-1.5zM22.5 12h1.5v1.5h-1.5zM1.5 12h1.5v1.5h-1.5zM3 10.5h1.5v1.5h-1.5zM0 10.5h1.5v1.5h-1.5zM6 10.5h1.5v1.5h-1.5zM7.5 12h1.5v1.5h-1.5zM9 10.5h1.5v1.5h-1.5zM13.5 12h1.5v1.5h-1.5zM15 10.5h1.5v1.5h-1.5zM16.5 12h1.5v1.5h-1.5zM18 10.5h1.5v1.5h-1.5zM19.5 12h1.5v1.5h-1.5zM21 10.5h1.5v1.5h-1.5zM22.5 15h1.5v1.5h-1.5zM13.5 15h1.5v1.5h-1.5zM15 13.5h1.5v1.5h-1.5zM16.5 15h1.5v1.5h-1.5zM19.5 15h1.5v1.5h-1.5zM21 13.5h1.5v1.5h-1.5zM22.5 18h1.5v1.5h-1.5zM13.5 18h1.5v1.5h-1.5zM15 16.5h1.5v1.5h-1.5zM18 16.5h1.5v1.5h-1.5zM19.5 18h1.5v1.5h-1.5zM21 16.5h1.5v1.5h-1.5zM22.5 21h1.5v1.5h-1.5zM15 19.5h1.5v1.5h-1.5zM16.5 21h1.5v1.5h-1.5zM18 19.5h1.5v1.5h-1.5zM19.5 21h1.5v1.5h-1.5zM15 22.5h1.5v1.5h-1.5zM18 22.5h1.5v1.5h-1.5zM21 22.5h1.5v1.5h-1.5z"
    on:click={() => showDialog = true}
  />
</div>
