import { Checkbox } from "antd";
import { CheckboxFilterProps } from "../../types";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const CheckboxFilter = ({
  options,
  handleFilterOptionChange: handleFilterOptionChangeProps,
}: CheckboxFilterProps) => {
  const handleFilterOptionChange = (
    e: CheckboxChangeEvent,
    filterTypeIndex: number
  ) => {
    handleFilterOptionChangeProps(e.target.checked, filterTypeIndex);
  };

  return (
    <>
      {options.map((option, index) => {
        const { key, checked } = option;
        return (
          <Checkbox
            key={index}
            checked={checked}
            onChange={(e) => handleFilterOptionChange(e, index)}
          >
            {key}
          </Checkbox>
        );
      })}
    </>
  );
};

export default CheckboxFilter;
