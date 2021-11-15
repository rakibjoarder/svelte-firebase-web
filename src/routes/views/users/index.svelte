<script>
	import { onDestroy, onMount } from 'svelte';
	// import PersonStore from "../../stores/personstore";
	import { fade, slide, scale } from 'svelte/transition';
	import Firestoredb from '../../../config/firebase';
	import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

	let people = [];

	// get person from store.js
	// var unsub = PersonStore.subscribe((data) => {
	// 	people = data;
	// });

	let ref = collection(Firestoredb, 'users');
	let unsub;
	onMount(() => {
		console.log('MOUNT ');
		console.log(unsub !== null);
		// // // get person from firebase

		if (unsub === null) {
			unsub = onSnapshot(ref, (snapshot) => {
				let results = [];
				snapshot.docs.forEach((doc) => {
					results.push({ ...doc.data(), id: doc.id });
				});

				console.log(results);

				people = results;
			});
		}
	});

	onDestroy(() => {
		console.log('onDestroy');
		// unsub();
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
	<div in:fade out:scale>
		<table>
			<tr>
				<th>Name</th>
				<th>Gender</th>
				<th>Age</th>
				<th>Action</th>
			</tr>
			{#each people as person}
				<tr out:fade>
					<td>{person.name}</td>
					<td>{person.gender}</td>
					<td>{person.age}</td>
					<button
						on:click={() => {
							onDelete(person.id);
						}}><i class="glyphicon glyphicon-thumbs-up" /></button
					>
				</tr>
			{:else}
				<div class="emptyTable">No Person Available</div>
			{/each}
			<tr>
				<th>Name</th>
				<th>Gender</th>
				<th>Age</th>
				<th>Action</th>
			</tr>
		</table>
	</div>
</main>

<style>
	table {
		font-family: roboto;
		border-collapse: collapse;
		width: 100%;
	}

	th {
		border: 1px solid #ffffff;
		background-color: #3d3d3d;
		color: white;
		text-align: center;
		padding: 8px;
	}

	td {
		border: 1px solid #dddddd;
		text-align: center;
		padding: 8px;
	}
	tr:nth-child(even) {
		background-color: rgb(230, 230, 230);
		color: black;
	}
	/* .tablehead {
		background-color: rgb(110, 110, 110);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.button {
		float: right;
		color: rgb(255, 255, 255);
		margin: 10px;
		font-weight: bold;
		padding: 5px 10px;
		border: 2px solid rgb(255, 255, 255);
		background-color: orange;
	}
	h3 {
		color: rgb(255, 255, 255);
		font-weight: bold;
	} */

	.emptyTable {
		text-align: center;
	}
	/* @media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style>
