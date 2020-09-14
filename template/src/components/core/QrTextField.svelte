<script>
  import Button from 'smelte/src/components/Button'
  import TextField from "smelte/src/components/TextField"
	import Dialog from 'smelte/src/components/Dialog'
  import QrScanner from './QrScanner.svelte'

  export let title = 'Scan QR Code from Video Camera'
  export let showDialog = false

  export let value = ''
  export let label = 'field label'
  export let disabled = false
  export let attributes = {}

  function onScanned(event) {
    value = event.detail
    showDialog = false
  }

  function onError(event) {
    value = event.detail
    showDialog = false
  }

</script>

<Dialog bind:value={showDialog}>
  <h6 slot="title">{title}</h6>

  {#if showDialog}
    <QrScanner
      on:scanned={onScanned}
      on:error={onError}
    />
  {/if}

  <div slot="actions">
    <Button on:click={() => showDialog = false}>Exit</Button>
  </div>
</Dialog>

<TextField
  {label}
  bind:value={value}
  {disabled}
  append=&#9778;
  {...attributes}
  on:click-append={() => showDialog = true}
/>
  <!-- append=&#9635;&#9638;QR -->
