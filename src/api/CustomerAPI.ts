const GET_CUSTOMERS_URL =
  "https://parloafrontendchallenge.z6.web.core.windows.net/customers.json";

export const fetchAllCustomers = async () => {
  try {
    const response = await fetch(GET_CUSTOMERS_URL);
    const customerData = await response.json();
    return customerData;
  } catch (error) {
    console.log("Error while fetching customers: ", error);
    return [];
  }
};
