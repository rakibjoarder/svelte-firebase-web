<script context="module">
	export const prerender = true;
	import ViewPerson from './views/users/index.svelte';
</script>

<body class="h-screen bg-gray-100">
	<section>
		<ViewPerson />
	</section>
</body>
