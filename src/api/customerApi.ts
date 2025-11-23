import type { CustomerForm } from "../types/customer";

// get all customers
export function getCustomers() {
    return fetch(import.meta.env.VITE_API_URL + "/customers")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching customers: " + response.statusText);

            return response.json();
        });
}

// delete customer using the self link URL
export function deleteCustomer(url: string) {
    return fetch(url, { method: "DELETE" })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting customer: " + response.statusText);

            return null; // API returns 204 No Content
        });
}

// Get a single customer by self link URL
export function getCustomer(url: string) {
    return fetch(url)
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching customer: " + response.statusText);
            return response.json();
        });
}

// create a new customer (POST)
export function saveCustomer(newCustomer: CustomerForm) {
    return fetch(import.meta.env.VITE_API_URL + "/customers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newCustomer)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding a new customer");

            return response.json();
        });
}

// update customer (PUT)
export function updateCustomer(url: string, updatedCustomer: CustomerForm) {
    return fetch(url, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedCustomer)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when updating customer");

            return response.json();
        });
}
