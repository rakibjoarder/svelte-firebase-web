<script context="module">
	export const load = async ({ fetch }) => {
		try {
			const res = await fetch('/api/product');
			const productList = await res.json();
			return {
				props: {
					productList
				}
			};
		} catch (e) {
			console.log(e);
		}
	};
</script>

<script>
	export let productList;
</script>

<div class="text-center font-bold text-3xl pb-5">Product List</div>
<div />
<div class="md:grid md:grid-cols-3 lg:grid-cols-5">
	{#each productList as item}
		<div class="card relative">
			<img
				src="https://ebazar247.s3-ap-southeast-1.amazonaws.com/{item.image}"
				alt="stew"
				class="h-28 m-auto"
			/>
			<!-- <p>{item.price}</p> -->
			<p class="block text-gray-500 text-sm p-4">{item.name} - {item.quantity} {item.unit_name}</p>
		</div>
	{/each}
</div>

<style>
	.card {
		@apply rounded h-60 md:h-60   md:m-2  m-7 bg-white border-gray-200 shadow-md overflow-hidden text-center p-2 pt-5 md:col-span-1;
	}
</style>
