<script>
  import TButton from '../components/ui/TButton.svelte'

  function onClick(value) {
    console.log(value, 'clicked')
  }
</script>

<main>
  <p class="bg-black text-white">Button components</p>

  <TButton on:click={() => onClick('Default')}>Default</TButton>
  <TButton on:click={() => onClick('Disabled')} disabled>Disabled</TButton>
  <TButton on:click={() => onClick('Icon 😊')}>Icon 😊</TButton>
  <TButton on:click={() => onClick('Indigo')} bgcolor="bg-indigo-600 hover:bg-indigo-700">Indigo</TButton>
  <TButton on:click={() => onClick('Green')} bgcolor="bg-green-600 hover:bg-green-700">Green</TButton>
</main>
