<script>
  export let list

</script>

<main>
  {list.name}
	{#each list.data as row}
    <div> {row[list.labelid]} </div>
    <div> {row[list.valueid]} </div>
    <hr />
	{/each}
</main>
