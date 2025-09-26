const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {
    this.baseURL = baseURL;
  }

  async getData(category) {
    const response = await fetch(`${this.baseURL}products/search/${category}`);
    return await convertToJson(response);
  }

  async findProductById(id) {
    const response = await fetch(`${this.baseURL}product/${id}`);
    return await convertToJson(response);
  }

  async checkout(orderData) {
    const response = await fetch(`${this.baseURL}checkout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    return await convertToJson(response);
  }
}
