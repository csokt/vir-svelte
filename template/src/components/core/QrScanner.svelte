<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'
  import { BrowserQRCodeReader } from '@zxing/library'

  const dispatch = createEventDispatcher()

  export let facing = 'environment'
  export let width = 340
  export let height = 340
  let codeReader

	onMount(async () => {
    codeReader = new BrowserQRCodeReader()
    let devices = []
    let deviceId = ''
    let result = {}
    let message = ''

    try {
      devices = await codeReader.getVideoInputDevices()
      if (!devices.length) {
        message = 'Nincs kamera!'
        dispatch('error', message)
        console.log(message)
        return
      }

      if (facing === 'environment' && devices.length > 1) {
        deviceId = devices[1].deviceId
      }

      result = await codeReader.decodeOnceFromVideoDevice(deviceId, 'qr-scan-video')
      dispatch('scanned', result.text)
      codeReader.reset()

    } catch (error) {
      message = 'A kamera nem elérhető!'
      dispatch('error', message)
      console.error(error)
    }
	})

  onDestroy(() => {
    console.log('QrScanner onDestroy')
    codeReader.reset()
  })
</script>

<div>
  <video id="qr-scan-video" {width} {height}>
    <track kind="captions" label="Video stream">
  </video>
</div>
