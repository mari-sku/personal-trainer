
export type Training = {
    date: string;        // ISO timestamp of the training
    duration: number;    // duration (in minutes)
    activity: string;    // type of activity 

     // _links is a HAL format metadata that contains links related to the training
    _links: {
        self: { href: string };      // URL of this specific training
        training: { href: string };  
        customer: { href: string };  // URL to access the customer that this training belongs to
    };
};

// adding the customer field to link the training to a specific customer
export type TrainingForm = {
    date: string;
    duration: number;
    activity: string;
    customer: string; // URL of the customer this training belongs to
};
