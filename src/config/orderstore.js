import { writable } from "svelte/store";
import { browser } from "$app/env";


const OrderItemStore = writable(JSON.parse(browser && localStorage.getItem('ordetItem')) || []);

export default OrderItemStore;
