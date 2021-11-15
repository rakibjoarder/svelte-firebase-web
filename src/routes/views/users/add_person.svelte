<script>
	import { fade, slide, scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import Firestoredb from '../../../config/firebase';
	import { collection, doc, addDoc, updateDoc, onSnapshot } from 'firebase/firestore';

	let dispatch = createEventDispatcher();

	// firestore reference
	let ref = collection(Firestoredb, 'users');

	const fields = {
		name: '',
		age: '',
		gender: ''
	};
	let valid = true;

	let errors = {
		name: '',
		age: '',
		gender: ''
	};

	const onSubmit = async () => {
		valid = true;
		if (fields.name.trim().length == 0) {
			valid = false;
			errors.name = 'Please Enter Name';
		} else {
			errors.name = '';
		}

		if (fields.age == 0) {
			valid = false;
			errors.age = 'Please Enter Age';
		} else {
			errors.age = '';
		}

		if (fields.gender.trim().length == 0) {
			valid = false;
			errors.gender = 'Please Select Gender';
		} else {
			errors.gender = '';
		}

		if (valid == true) {
			const person = {
				name: fields.name,
				age: fields.age,
				gender: fields.gender,
				id: Math.random()
			};

			// add user  to store
			await PersonStore.update((currentPerson) => {
				return [person, ...currentPerson];
			});
			// add user  to firebase
			await addDoc(ref, person);

			dispatch('addPerson', person);
		}
	};
</script>

<main>
	<div class="formdiv" in:scale>
		<p class="headerText">Add Person</p>
		<form on:submit|preventDefault={onSubmit}>
			<input type="text" name="Name" bind:value={fields.name} placeholder="Name" />
			{#if valid == false}
				<div class="error">{errors.name}</div>
			{/if}
			<input type="number" name="Age" bind:value={fields.age} placeholder="Age" />
			{#if valid == false}
				<div class="error">{errors.age}</div>
			{/if}
			<select class="selectGender" bind:value={fields.gender}>
				<option value="">Select Gender</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
			</select>
			{#if valid == false}
				<div class="error">{errors.gender}</div>
			{/if}
			<br />
			<input class="btn" type="submit" /><br />
		</form>
	</div>
</main>

<style>
	.formdiv {
		padding: 10px;
		background-color: #f7f7f7;
		margin: auto;
		width: 60%;
		border: 1px solid orange;
		box-shadow: 0.2px 0.2px 30px 0px grey;
		padding: 10px;
		border-radius: 10px;
	}

	.btn {
		border: 0 px;
		cursor: pointer;
		padding: 8px 12px;
		font-weight: bold;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0, 0.2);
		background-color: orange;
		color: white;
	}

	.selectGender {
		color: #000;
		width: 80%;
		cursor: pointer;
		border-radius: 10px;
	}

	input {
		width: 80%;
		border-radius: 10px;
	}

	.error {
		color: red;
		font-size: 10px;
		padding-bottom: 10px;
	}

	.headerText {
		color: orange;
		padding: 10px;
		font-weight: bold;
	}

	@media (min-width: 640px) {
		.selectGender {
			width: 300px;
		}
		input {
			width: 300px;
		}
		.formdiv {
			width: 400px;
		}
	}
</style>
