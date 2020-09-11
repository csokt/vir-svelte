<script>
  import { onMount } from 'svelte'
  import { BrowserQRCodeReader } from '@zxing/library'
	import Dialog from 'smelte/src/components/Dialog'
	import Button from 'smelte/src/components/Button'

  export let title = 'Scan QR Code from Video Camera'
  export let showDialog = false

  export let facing = 'environment'
  let qrcode = ''
  let devices = []

  const codeReader = new BrowserQRCodeReader()

  codeReader.getVideoInputDevices()
    .then((videoInputDevices) => {
      devices = videoInputDevices
      console.log(devices)
    })
    .catch((err) => {
      console.error(err)
    })

  function decodeOnce(selectedDeviceId) {
    codeReader.decodeOnceFromVideoDevice(selectedDeviceId, 'video').then((result) => {
      qrcode = result.text
      codeReader.reset()
    }).catch((err) => {
      qrcode = err
      console.error(err)
    })
  }

  function onStart() {
    let deviceId = ''
    qrcode = ''
    if (facing === 'environment' && devices.length > 1) {
      deviceId = devices[1].deviceId
    }
    decodeOnce(deviceId)
  }

	onMount( () => {
    console.log('onMount')
	})

</script>

<Dialog bind:value={showDialog}>
  <h6 slot="title">{title}</h6>

  <section>
    <div>
      <button on:click={onStart}>
        Start
      </button>
      <span>Result: {qrcode}</span>
    </div>

    <div>
      <video id="video" width="340" height="340">
        <track kind="captions" label="Video stream">
      </video>
    </div>
  </section>

  <div slot="actions">
    <Button on:click={() => showDialog = false}>Exit</Button>
  </div>
</Dialog>

<div class="py-2">
  <Button on:click={() => showDialog = true}>Show dialog</Button>
</div>