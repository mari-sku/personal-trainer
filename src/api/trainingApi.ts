import type { TrainingForm } from "../types/training";

// get all trainings
export function getTrainings() {
    return fetch(import.meta.env.VITE_API_URL + "/trainings")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings: " + response.statusText);

            return response.json();
        });
}

// get trainings with customer info included
export function getTrainingsWithCustomer() {
    return fetch(import.meta.env.VITE_API_URL + "/gettrainings")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings with customer info: " + response.statusText);
            return response.json();
        });
}

// delete training using the self link URL
export function deleteTraining(url: string) {
    return fetch(url, { method: "DELETE" })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting training: " + response.statusText);
            return null; // API returns 204 No Content
        });
}

// add a new training (POST)
export function saveTraining(newTraining: TrainingForm) {
    return fetch(import.meta.env.VITE_API_URL + "/trainings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newTraining)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding a new training");

            return response.json();
        });
}
