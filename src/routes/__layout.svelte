<script>
	import '../app.css';
	import Header from '$lib/header/Header.svelte';
	import Nav from '../routes/views/components/nav.svelte';
	import Footer from '../routes/views/components/footer.svelte';
</script>

<!-- <Header /> -->
<div class="md:grid md:grid-cols-5">
	<div class="md:col-span-1 bg-gray-300 md:flex md:justify-end ">
		<Nav />
	</div>
	<div class="bg-gray-200 col-span-4 ">
		<div class="p-10 h-screen"><slot /></div>
		<Footer />
	</div>
</div>
