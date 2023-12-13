import { Button, Card, DatePicker, Form, Input, Modal } from "antd";
import { CustomerFormProps, Project } from "../../../types";
import { MinusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';
import {
  ADD_NEW_CUSTOMER,
  ADD_PROJECT,
  CREATE,
  EDIT_ACTION,
  EDIT_CUSTOMER,
  UPDATE,
} from "../constants";

const CustomerForm = ({
  isOpen,
  oncancel,
  onSave,
  actionType,
  editCustomer,
}: CustomerFormProps) => {
  const [form] = Form.useForm();
  form.resetFields();
  form.setFieldsValue({
    company: editCustomer[0]?.company || "",
    industry: editCustomer[0]?.industry || "",
    about: editCustomer[0]?.about || "",
    projects:
      actionType === "edit"
        ? editCustomer[0]?.projects.map((project: Project) => {
            return {
              id: project.id,
              name: project.name,
              start_date: dayjs(project.start_date),
              end_date: dayjs(project.end_date),
              contact: project.contact,
            };
          })
        : [
            {
              id: uuidv4(),
              name: "",
              start_date: "",
              end_date: null,
              contact: null,
            },
          ],
  });

  const handleCancel = () => {
    oncancel();
  };

  return (
    <Modal
      open={isOpen}
      title={actionType === EDIT_ACTION ? EDIT_CUSTOMER : ADD_NEW_CUSTOMER}
      okText={actionType === EDIT_ACTION ? UPDATE : CREATE}
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onSave(values);
            handleCancel();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form layout="horizontal" form={form}>
        <Form.Item
          label="Add Company"
          name="company"
          rules={[{ required: true }]}
        >
          <Input placeholder="add company name" />
        </Form.Item>
        <Form.Item
          label="Add Industry"
          name="industry"
          rules={[{ required: true }]}
        >
          <Input placeholder="add industry type" />
        </Form.Item>
        <Form.Item label="Add Description" name="about">
          <Input.TextArea placeholder="add description" />
        </Form.Item>
        <Form.List name="projects">
          {(fields, { add, remove }) => (
            <div className="project-list">
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Project ${field.name + 1}`}
                  key={field.key}
                  extra={
                    fields.length > 1 ? (
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    ) : null
                  }
                >
                  <Form.Item
                    label="Project Name"
                    name={[field.name, "name"]}
                    rules={[
                      { required: true, message: "project name is required" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Contact" name={[field.name, "contact"]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Start Date"
                    name={[field.name, "start_date"]}
                    rules={[
                      { required: true, message: "start date is required" },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item label="End Date" name={[field.name, "end_date"]}>
                    <DatePicker />
                  </Form.Item>
                </Card>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                {ADD_PROJECT}
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default CustomerForm;
