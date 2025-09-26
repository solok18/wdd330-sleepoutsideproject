import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.services = new ExternalServices();
  }

  async checkout() {
    const form = document.forms["checkout"];
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const order = {
      fname: form.fname.value,
      lname: form.lname.value,
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      zip: form.zip.value,
      cardNumber: form.cardNumber.value,
      expiration: form.expiration.value,
      code: form.code.value,
      items: getLocalStorage(this.key),
    };

    try {
      const response = await this.services.checkout(order);
      console.log("Order success:", response);
      localStorage.removeItem(this.key);
      window.location.href = "/checkout/success.html";
    } catch (err) {
      console.error("Order failed:", err.message);
      document.querySelector(this.outputSelector).innerHTML =
        `<p class="error">Order failed: ${JSON.stringify(err.message)}</p>`;
    }
  }
}
