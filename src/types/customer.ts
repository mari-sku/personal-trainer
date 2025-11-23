
export type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    // _links is a HAL format metadata that contains links related to the customer
    _links: {
        self: { href: string };      // URL of this specific customer
        customer: { href: string };
        trainings: { href: string }; // URL to access this customer's trainings
    };
};

// omit _links because it's not needed when creating, deleting or updating a customer. 
// _links is the API metadata unrelated to customer data
export type CustomerForm = Omit<Customer, "_links">; 