<script>
  export let baseClass = 'py-2 px-4 rounded tracking-wider my-1 focus:outline-none focus:shadow-outline'
  export let font = 'font-bold'
  export let color = 'text-white'
  export let bgcolor = 'bg-blue-600 hover:bg-blue-700'
  export let disabled = false
</script>

<main>
  <button on:click type="button" class="{baseClass} {font} {color} {bgcolor} {disabled ? 'opacity-50 cursor-not-allowed' : ''}" {disabled}>
    <span class="whitespace-no-wrap">
      <slot />
    </span>
  </button>
</main>
