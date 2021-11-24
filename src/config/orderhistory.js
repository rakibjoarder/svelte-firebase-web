import { writable } from "svelte/store";
import { browser } from "$app/env";


const OrderHistoryStore = writable(JSON.parse(browser && localStorage.getItem('orders')) || []);


export default OrderHistoryStore;