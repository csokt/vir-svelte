<script>
	let ishidden = true
</script>

<div>
<button on:click={() => ishidden = !ishidden}> Toggle</button>
<p hidden={ishidden}>This paragraph should be hidden.</p>
<p>This is a visible paragraph.</p>
<p><b>Note:</b> The hidden attribute is not supported in IE10 or earlier versions.</p>

</div>