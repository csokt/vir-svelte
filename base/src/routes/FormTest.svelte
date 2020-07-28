<script>
  import config from '../config'
  import Form from '../components/Form.svelte'

  export let params = {}

  let form = config.forms[params.id]
  let fields = config.forms[params.id].fields
  let data = config.forms[params.id].data
  // console.log(params)

</script>

<main>
  <p class="bg-black text-white">Form components</p>

  <Form {form} />
</main>
