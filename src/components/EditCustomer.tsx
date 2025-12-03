import { useState } from "react";

// MUI components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from '@mui/icons-material/Edit';

import type { Customer, CustomerForm } from "../types/customer";

type EditCustomerProps = {
  fetchCustomers: () => void;
  customerRow: Customer;    // so we know which customer to edit
};

export default function EditCustomer({ fetchCustomers, customerRow }: EditCustomerProps) {  // receiving the props

  const [open, setOpen] = useState(false);

  const [customer, setCustomer] = useState<CustomerForm>({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: ""
  });

  // Open dialog and load the customer data we brought with customerRow prop, so we can edit it
  const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
      firstname: customerRow.firstname,
      lastname: customerRow.lastname,
      streetaddress: customerRow.streetaddress,
      postcode: customerRow.postcode,
      city: customerRow.city,
      email: customerRow.email,
      phone: customerRow.phone
    });
  };

  // Close dialog and reset form
  const handleClose = () => {
    setOpen(false);
    setCustomer({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    });
  };

  // Save updated customer
  const handleSave = () => {
    if (isNaN(Number(customer.postcode))) {
        alert("Postcode must be a number");
        return;
      }
      if (isNaN(Number(customer.phone))) {
        alert("Phone must be a number");
        return;
      }
    if (!customer.firstname || !customer.lastname || !customer.streetaddress || !customer.postcode ||
        !customer.city || !customer.email || !customer.phone) {
      alert("All fields are required");
      return;
    }

    fetch(customerRow._links.self.href, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },  // can be one or many headers
      body: JSON.stringify(customer)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update customer");
        return res.json();
      })
      .then(() => {
        fetchCustomers();
        handleClose();
      })
      .catch(err => console.error(err));
  };

  return (
    <>
       <Button size="small" onClick={handleClickOpen}>
        <EditIcon />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>

        <DialogContent>

          <TextField
            margin="dense"
            label="First name"
            fullWidth
            variant="standard"
            value={customer.firstname}
            onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Last name"
            fullWidth
            variant="standard"
            value={customer.lastname}
            onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Street address"
            fullWidth
            variant="standard"
            value={customer.streetaddress}
            onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Postcode"
            fullWidth
            variant="standard"
            value={customer.postcode}
            onChange={e => setCustomer({ ...customer, postcode: e.target.value })}
          />

          <TextField
            margin="dense"
            label="City"
            fullWidth
            variant="standard"
            value={customer.city}
            onChange={e => setCustomer({ ...customer, city: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
            value={customer.email}
            onChange={e => setCustomer({ ...customer, email: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            variant="standard"
            value={customer.phone}
            onChange={e => setCustomer({ ...customer, phone: e.target.value })}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>

      </Dialog>
    </>
  );
}
