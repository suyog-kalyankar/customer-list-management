import { Button, Empty, Table, Typography, message } from "antd";
import useGetCustomers from "../../hooks/useGetCustomers";
import useCustomerColumns from "../../hooks/useCustomerColumns";
import { useEffect, useState } from "react";
import CustomerForm from "./customer-form";
import { Customer } from "../../types";
import CheckboxFilter from "../../components/checkbox–filter";
import {
  ADD_CUSTOMER,
  DEFAULT_CONTRACT_TYPE_OPTIONS_CONFIG,
  DELETE_ACTION,
  EDIT_ACTION,
  PAGE_ERROR_MESSAGE,
} from "./constants";

const CustomerListings = () => {
  const {
    customersList,
    industryTypes,
    isLoading,
    addCustomer,
    deleteCustomer,
    updateCustomer,
    filterCustomers,
    error,
  } = useGetCustomers();
  const { columnConfig, selectedCustomer, resetSelectedCustomer } =
    useCustomerColumns({
      industryTypes,
    });
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [contractTypeOptions, setContractTypeOptions] = useState(
    JSON.parse(JSON.stringify(DEFAULT_CONTRACT_TYPE_OPTIONS_CONFIG))
  );
  const [editCustomer, setEditCustomer] = useState<Customer[]>([]);

  const handleCreateCustomerClick = () => {
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    resetSelectedCustomer();
    setEditCustomer([]);
  };

  const resetContractTypeFilter = () => {
    setContractTypeOptions(
      JSON.parse(JSON.stringify(DEFAULT_CONTRACT_TYPE_OPTIONS_CONFIG))
    );
  };

  // handling delete and edit action on selection of customer from table
  useEffect(() => {
    if (selectedCustomer.action === DELETE_ACTION) {
      deleteCustomer(selectedCustomer.id);
      resetSelectedCustomer();
      resetContractTypeFilter();
    } else if (selectedCustomer.action === EDIT_ACTION) {
      const obj = customersList.filter(
        (customer: Customer) => customer.id === selectedCustomer.id
      );
      setShowAddModal(true);
      setEditCustomer(obj);
    }
  }, [JSON.stringify(selectedCustomer), JSON.stringify(customersList)]);

  // handling create new customer or edit customer on basis of action type
  const handleSubmit = (customerData: Customer) => {
    if (selectedCustomer.action === EDIT_ACTION) {
      updateCustomer(customerData, selectedCustomer.id);
    } else {
      addCustomer(customerData);
    }
    resetSelectedCustomer();
    resetContractTypeFilter();
    setEditCustomer([]);
  };

  // handling active/ inactive customers checkbox selection
  const handleContractFilterChanges = (
    isEnabled: boolean,
    filterTypeIndex: number
  ) => {
    const updatedContractTypeOptions = [...contractTypeOptions];
    updatedContractTypeOptions[filterTypeIndex].checked = isEnabled;
    setContractTypeOptions(updatedContractTypeOptions);
    filterCustomers(
      updatedContractTypeOptions
        .filter((option) => option.checked)
        .map((option) => option.key)
    );
  };

  if (error) {
    return <Typography.Text>{PAGE_ERROR_MESSAGE}</Typography.Text>;
  }

  return (
    <div>
      <div className="filter-section">
        <CheckboxFilter
          options={contractTypeOptions}
          handleFilterOptionChange={handleContractFilterChanges}
        />
        <Button type="primary" onClick={handleCreateCustomerClick}>
          {ADD_CUSTOMER}
        </Button>
      </div>
      <CustomerForm
        isOpen={showAddModal}
        oncancel={closeModal}
        onSave={(values) => handleSubmit(values)}
        actionType={selectedCustomer.action}
        editCustomer={editCustomer}
      />
      {customersList.length > 0 ? (
        <Table
          loading={isLoading}
          columns={columnConfig}
          dataSource={customersList}
        ></Table>
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
};

export default CustomerListings;
