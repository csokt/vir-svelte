<script>
	let w;
	let h;
	let size = 42;
	let text = 'edit me';
</script>

<style>
	input { display: block; }
	div { display: inline-block; }
	span { word-break: break-all; }
</style>

<main bind:clientWidth={w} bind:clientHeight={h} class="w-full">
<input type=range bind:value={size}>
<input bind:value={text}>

<p>size: {w}px x {h}px</p>

<div>
	<span style="font-size: {size}px">{text}</span>
</div>
</main>