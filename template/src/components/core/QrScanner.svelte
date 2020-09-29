<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'
  import { BrowserQRCodeReader } from '@zxing/library'

  const dispatch = createEventDispatcher()

  export let facingmode = 'environment'
  export let width = 340
  export let height = 340
  let codeReader
  let message = ''

	onMount(async () => {
    codeReader = new BrowserQRCodeReader()
    let devices = []
    let deviceId = ''
    let result = {}

    try {
      devices = await codeReader.getVideoInputDevices()
      if (!devices.length) {
        message = 'Nincs kamera!'
        console.log(message)
        return
      }

      if (facingmode === 'user' && devices.length > 0) {
        deviceId = devices[0].deviceId
      }
      if (facingmode === 'environment' && devices.length > 1) {
        deviceId = devices[1].deviceId
      }

      result = await codeReader.decodeOnceFromVideoDevice(deviceId, 'qr-scan-video')
      dispatch('scanned', result.text)
      codeReader.reset()

    } catch (error) {
      message = 'A kamera nem elérhető!'
      console.error(error)
    }
	})

  onDestroy(() => {
    codeReader.reset()
  })
</script>

<div>
  {message}
  <video id="qr-scan-video" {width} {height}>
    <track kind="captions" label="Video stream">
  </video>
</div>
