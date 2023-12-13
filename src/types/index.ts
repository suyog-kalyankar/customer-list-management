export interface Project {
  id: string;
  name: string;
  contact: string;
  start_date: string;
  end_date: string;
}

export interface Customer {
  key?: React.Key;
  id: string;
  isActive: boolean;
  company: string;
  industry: string;
  projects: Project[];
  about: string;
}

export type CustomerFormProps = {
  isOpen: boolean;
  oncancel: () => void;
  onSave: (values: Customer) => void;
  actionType: string;
  editCustomer: Customer[];
};

export type SelectedCustomer = {
  id: string;
  action: string;
};

export type CustomerColumnProps = {
  industryTypes: string[];
};

export type CheckboxFilterProps = {
  options: ContractTypeProps[];
  handleFilterOptionChange: (
    isEnabled: boolean,
    filterTypeIndex: number
  ) => void;
};

export type ContractTypeProps = {
    key: string,
    checked: boolean
}
