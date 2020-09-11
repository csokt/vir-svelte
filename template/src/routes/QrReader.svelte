<script>
  import { BrowserQRCodeReader } from '@zxing/library'

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

</script>

<main>
  <section>
    <h3>Scan QR Code from Video Camera</h3>

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

</main>

<style>

</style>