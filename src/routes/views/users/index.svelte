<script>
	import { onDestroy, onMount } from 'svelte';
	// import PersonStore from "../../stores/personstore";
	import { fade, slide, scale } from 'svelte/transition';
	import Firestoredb from '../../../config/firebase';
	import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
	let people = [
		{
			name: '12',
			age: 2,
			gender: 'fa',
			id: Math.random()
		},
		{
			name: '12',
			age: 2,
			gender: 'fa',
			id: Math.random()
		},
		{
			name: '12',
			age: 2,
			gender: 'fa',
			id: Math.random()
		},
		{
			name: '12',
			age: 2,
			gender: 'fa',
			id: Math.random()
		},
		{
			name: '12',
			age: 2,
			gender: 'fa',
			id: Math.random()
		}
	];
	// get person from store.js
	// var unsub = PersonStore.subscribe((data) => {
	// 	people = data;
	// });
	let ref = collection(Firestoredb, 'users');
	// unsub = onSnapshot(ref, (snapshot) => {
	// 	let results = [];
	// 	snapshot.docs.forEach((doc) => {
	// 		results.push({ ...doc.data(), id: doc.id });
	// 	});
	// 	console.log(results);
	// 	people = results + results + results;
	// });
	onDestroy(() => {
		console.log('onDestroy');
	});
	const onDelete = async (id) => {
		console.log(id);
		// people = people.filter((person) => person.id != id);
		// update data in person store
		// PersonStore.update((currentPerson) => {
		// 	return people.filter((person) => person.id != id);
		// });
		await deleteDoc(doc(Firestoredb, 'users', id));
		// await deleteDoc(ref, id);
	};
</script>

<main>
	<div in:fade out:fade class="block w-full overflow-x-auto md:p-10 ">
		<div class="class bg-gray-800   border-none w-full flex justify-between items-center">
			<h3 class="text-white font-bold pl-5 te">User Table</h3>

			<a
				class="text-gray-800 border-red  bg-white p-1 m-2 px-4 rounded text-sm"
				href="users/Adduser">Add User</a
			>
		</div>
		<table
			class=" table w-full border border-gray-700 border-t-0 rounded shadow-xl overflow-auto border"
		>
			<tr class="flex justify-around bg-gray-900 text-white p-2">
				<th class="text-sm">Name</th>
				<th class="text-sm">Gender</th>
				<th class="text-sm">Age</th>
				<th class="text-sm">Action</th>
			</tr>
			{#each people as person}
				<tr
					out:fade
					class="flex justify-around border-b-1 border-gray-700 p-s bg-gray-800 text-white  border-b-2"
				>
					<td class=" text-xs">{person.name}</td>
					<td class=" text-xs">{person.gender}</td>
					<td class=" text-xs">{person.age}</td>

					<button
						on:click={() => {
							onDelete(person.id);
						}}
						><svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
								clip-rule="evenodd"
							/>
						</svg></button
					>
				</tr>
			{:else}
				<div class="emptyTable">No Person Available</div>
			{/each}
		</table>
	</div>
</main>

<style>
	td {
		@apply p-2;
	}
</style>
