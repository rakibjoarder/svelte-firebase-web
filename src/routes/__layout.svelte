<script>
	import '../app.css';
	import Footer from './views/components/Footer.svelte';
	import SideBar from './views/components/SideBar.svelte';
</script>

<!-- <Header /> -->
<div class="md:grid md:grid-cols-5">
	<div class="md:col-span-1 bg-gray-300 md:flex md:justify-end ">
		<SideBar />
	</div>
	<div class="bg-gray-200 col-span-4 ">
		<div class="p-10 h-screen"><slot /></div>
		<Footer />
	</div>
</div>
