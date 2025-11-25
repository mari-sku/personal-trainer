
export type Training = {
    id: number;
    date: string;
    duration: number;
    activity: string;
    customer: {
        id: number;
        firstname: string;
        lastname: string;
        streetaddress: string;
        postcode: string;
        city: string;
        email: string;
        phone: string;
    };
};

export type TrainingForm = {
    date: string;
    duration: number;
    activity: string;
    customer: string; // URL of the customer this training belongs to
};
