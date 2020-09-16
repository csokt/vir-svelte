<script>
  import { createEventDispatcher } from 'svelte'
  import TextField from "smelte/src/components/TextField"
	import Dialog from 'smelte/src/components/Dialog'
  import QrScanner from './QrScanner.svelte'

  const dispatch = createEventDispatcher()

  export let title = 'Scan QR'
  export let showDialog = false

  export let value = ''
  export let label = 'field label'
  export let disabled = false
  export let attributes = {}

  function onScanned(event) {
    value = event.detail
    dispatch('change', value)
    showDialog = false
  }

</script>

<Dialog bind:value={showDialog} persistent>
  <div slot="title">
    <span on:click={() => showDialog = false}>&#11013;</span>
    {title}
  </div>

  {#if showDialog}
    <QrScanner
      on:scanned={onScanned}
    />
  {/if}
</Dialog>

<TextField
  {label}
  bind:value={value}
  {disabled}
  append=&#9778;
  {...attributes}
  on:click-append={() => showDialog = true}
  on:change
/>
