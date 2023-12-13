import { useEffect, useState } from "react";
import { fetchAllCustomers } from "../api/CustomerAPI";
import { Customer, Project } from "../types";
import dayjs from "dayjs";
import {
  ACTIVE_KEY,
  INACTIVE_KEY,
} from "../components/customer-listings/constants";
import { v4 as uuidv4 } from "uuid";

const useGetCustomers = () => {
  const [customersList, setCustomersList] = useState<Customer[]>([]);
  const [filteredCustomersList, setFilteredCustomersList] = useState<
    Customer[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // fetch all customers using api call and sets it in a state
  const getCustomers = () => {
    setIsLoading(true);
    fetchAllCustomers()
      .then((data) => {
        setCustomersList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    setFilteredCustomersList(customersList);
  }, [JSON.stringify(customersList)]);

  const checkActiveCustomer = (customer: Customer) => {
    const isActive = customer?.projects?.some(
      (project: Project) =>
        dayjs(project.start_date).isBefore(dayjs()) &&
        (dayjs(project.end_date).isAfter(dayjs()) ||
          !dayjs(project.end_date).isValid())
    );
    return isActive;
  };

  // add new customer in existing customers array by checking it's status
  const addCustomer = (customer: Customer) => {
    const isActive = checkActiveCustomer(customer);
    const obj: Customer = {
      ...customer,
      id: uuidv4(),
      isActive,
    };
    setCustomersList([...customersList, obj]);
  };

  // returns filtered customers on selection of active/ inctive cheeckbox
  const filterCustomers = (filter: string[]) => {
    const newCustomerArr = [...customersList];
    let filteredCustomer: Customer[] = [];
    if (filter.includes(ACTIVE_KEY) && filter.includes(INACTIVE_KEY)) {
      filteredCustomer = newCustomerArr;
    } else if (filter.includes(ACTIVE_KEY)) {
      filteredCustomer = newCustomerArr?.filter(
        (customer: Customer) => customer.isActive
      );
    } else if (filter.includes(INACTIVE_KEY)) {
      filteredCustomer = newCustomerArr?.filter(
        (customer: Customer) => !customer.isActive
      );
    }
    setFilteredCustomersList(filteredCustomer);
  };

  // update customers array with the updated customer
  const updateCustomer = (updatedCustomer: Customer, id: string) => {
    const editedCustomerIndex = customersList.findIndex(
      (customer) => customer.id === id
    );
    const newCustomerArr = [...customersList];
    const isActive = checkActiveCustomer(updatedCustomer);
    const updatedCustomerObj = { ...updatedCustomer, isActive };
    newCustomerArr[editedCustomerIndex] = {
      ...newCustomerArr[editedCustomerIndex],
      ...updatedCustomerObj,
    };
    setCustomersList(newCustomerArr);
  };

  // deletes the selected inactive customer
  const deleteCustomer = (id: string) => {
    setCustomersList(
      customersList.filter((customer: Customer) => customer.id !== id)
    );
  };

  // gives array list of industries from the customers array
  const industryTypes = customersList.reduce(
    (accumulator: string[], currentValue: Customer) => {
      if (accumulator.indexOf(currentValue?.industry) === -1) {
        accumulator.push(currentValue.industry);
      }
      return accumulator;
    },
    []
  );

  return {
    customersList: filteredCustomersList,
    industryTypes,
    isLoading,
    error,
    addCustomer,
    deleteCustomer,
    updateCustomer,
    filterCustomers,
  };
};

export default useGetCustomers;
