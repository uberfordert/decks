<template>
  <div ref="paypalButtonContainer"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useCartStore } from "../store/cart";
import { usePaypalStore } from "../store/paypal";
import emailjs from "@emailjs/browser";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const MAIL_SERVICE_ID = import.meta.env.VITE_MAIL_SERVICE_ID;
const MAIL_TEMPLATE_ID = import.meta.env.VITE_MAIL_TEMPLATE_ID;
const MAIL_PUBLIC_KEY = import.meta.env.VITE_MAIL_PUBLIC_KEY;
const paypalButtonContainer = ref(null);

onMounted(() => {
  const script = document.createElement("script");
  script.src =
    "https://www.paypal.com/sdk/js?client-id=" +
    PAYPAL_CLIENT_ID +
    "&disable-funding=credit,eps,sofort";
  script.async = true;
  script.onload = initPayPalButton;
  document.body.appendChild(script);
});

const sendSuccesfulPurchaseMail = (details) => {
  const emailData = {
    address:
      details.purchase_units[0].shipping.address.address_line_1 +
      " " +
      details.purchase_units[0].shipping.address.address_line_2 +
      " " +
      details.purchase_units[0].shipping.address.admin_area_2 +
      " " +
      details.purchase_units[0].shipping.address.country_code +
      " " +
      details.purchase_units[0].shipping.address.postal_code,
    from_name: details.payer.name.given_name + " " + details.payer.name.surname,
    user_email: details.payer.email_address,
    reply_to: "reply@mail.com",
    date: details.create_time,
  };
  emailjs
    .send(MAIL_SERVICE_ID, MAIL_TEMPLATE_ID, emailData, MAIL_PUBLIC_KEY)
    .then(
      (result) => {
        console.log("Successful Mail", result.text);
      },
      (error) => {
        console.log("Error Mail", error.text);
      }
    );
};

const initPayPalButton = () => {
  paypal
    .Buttons({
      style: {
        color: "black",
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                name: "Uberforder Shirt",
                value: 25 * useCartStore().cartList.list.length,
              },
            },
          ],
        });
      },
      onApprove: (data, actions) => {
        //Details contains information about the user
        //Todo: after purchase protocol: e.g. send email to user...
        actions.order.capture().then((details) => {
          sendSuccesfulPurchaseMail(details);
          console.log(details);
          usePaypalStore().succesfulPurchase = true;
          console.log("Email: ", details.payer.email_address);
          console.log("Address: ", details.purchase_units[0].shipping.address);
          console.log("Value: ", details.purchase_units[0].amount.value);
          console.log(
            "Currency: ",
            details.purchase_units[0].amount.currency_code
          );
          console.log("Name: ", details.payer.name);
          console.log("Date: ", details.create_time);
        });
      },
    })
    .render(paypalButtonContainer.value);
};
</script>
