import React from "react";
import Select from "react-select";

type option = {
  label: string;
  value: number;
};

type Props = {
  dropdownItems: {name: string, id: number}[] | undefined;
  placeholderText: string;
  getSelected: (option: option) => void;
};

export const SearchableDropdown: React.FC<Props> = ({
  dropdownItems,
  placeholderText,
  getSelected,
}) => {
  return (
    <div>
      <Select<option>
        placeholder={placeholderText}
        onChange={(option) =>
          option ? getSelected(option) : getSelected({label: "", value: 0})
        }
        options={dropdownItems?.map((item) => ({ label: item.name, value: item.id }))}
      />
    </div>
  );
};
