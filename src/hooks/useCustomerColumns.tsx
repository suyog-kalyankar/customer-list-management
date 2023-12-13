import { Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import {
  Customer,
  CustomerColumnProps,
  Project,
  SelectedCustomer,
} from "../types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  ACTIVE_KEY,
  INACTIVE_KEY,
} from "../components/customer-listings/constants";

const useCustomerColumns = ({ industryTypes }: CustomerColumnProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState<SelectedCustomer>({
    id: "",
    action: "",
  });
  const { Text } = Typography;

  // set selected customer row from the table with action type
  const handleAction = (
    id: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    action: string
  ) => {
    e.preventDefault();
    setSelectedCustomer({ id, action });
  };

  const resetSelectedCustomer = () => {
    setSelectedCustomer({ id: "", action: "" });
  };

  const columnConfig: ColumnsType<Customer> = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Text>{isActive ? ACTIVE_KEY : INACTIVE_KEY}</Text>
      ),
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      filters: industryTypes.map((industry: string) => {
        return { text: industry, value: industry };
      }),
      onFilter: (value, cusomter: Customer) =>
        cusomter.industry.startsWith(value.toString()),
    },
    {
      title: "Projects",
      dataIndex: "projects",
      key: "projects",
      render: (record: Project[]) =>
        record?.map((project: Project) => {
          return (
            <Text key={project.id}>
              {project.name}
              <br />
            </Text>
          );
        }),
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record: Customer) => {
        return (
          <div className="action-div">
            {!record?.isActive && (
              <DeleteOutlined
                onClick={(e) => handleAction(record?.id, e, "delete")}
              />
            )}
            <EditOutlined
              onClick={(e) => handleAction(record?.id, e, "edit")}
            />
          </div>
        );
      },
    },
  ];

  return { columnConfig, selectedCustomer, resetSelectedCustomer };
};

export default useCustomerColumns;
