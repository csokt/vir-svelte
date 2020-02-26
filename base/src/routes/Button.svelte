<main>
  <div>
  <h1>Button components</h1>
    <br />
    <TButton on:click={ () => onClick('Default')  }>Default</TButton>
    <TButton on:click={ () => onClick('Disabled') } disabled>Disabled</TButton>
    <TButton on:click={ () => onClick('Icon 😊')  }>Icon 😊</TButton>
    <TButton on:click={ () => onClick('Indigo')   } bgcolor='bg-indigo-600 hover:bg-indigo-700'>Indigo</TButton>
    <TButton on:click={ () => onClick('Green')    } bgcolor='bg-green-600 hover:bg-green-700'>Green</TButton>
  </div>
</main>

<script>
// @ is an alias to /src
  import TButton from '../components/ui/TButton.svelte'

	function onClick(value) {
		console.log(value, 'clicked')
	}

</script>

<style>
  h1 {
    @apply bg-black text-white;
  }
</style>