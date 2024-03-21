import { Combobox, Transition } from "@headlessui/react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import debounce from "just-debounce-it";
import { AxiosResponse } from "axios";

interface Props {
  placeholder: string;
  name: string;
  fnFind: (value: string) => Promise<AxiosResponse | void>;
  label: string;
  selectedItem: stateComboBox | null;
  setSelectedItem: Dispatch<SetStateAction< stateComboBox |null>>;
}

export type stateComboBox ={
  id?:number,
  text?:string
}

export const CustomComboBox = ({
  placeholder,
  name,
  fnFind,
  label,
  selectedItem,
  setSelectedItem,
}: Props) => {
  const [items, setItems] = useState([]);

  const debounceHandleChangeInput = useCallback(
    debounce(async (valueInput: string) => {
      if (valueInput.length <= 2) return setItems([]);
      fnFind(valueInput).then((response) => {
        const { data } = response as AxiosResponse;
        if (data) {
          setItems(data);
        }
      });
    }, 300),
    []
  );
  return (
    <>
      <div>
        <label htmlFor={name} className="text-sm font-semibold">
          {label}
        </label>
        <Combobox
          as="div"
          value={selectedItem}
          onChange={setSelectedItem}
          name={name}
        >
          <Combobox.Input
            type="search"
            onChange={(event) => debounceHandleChangeInput(event.target.value)}
            placeholder={placeholder}
            displayValue={(option: { id: number; text: string }) =>
              option?.text.toUpperCase()
            }
            className=" w-full rounded-md border-0 py-1.5 pl-3 mt-2 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Combobox.Options
              as="ul"
              className="bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none mt-1"
            >
              {items.map((item:any) => (
                <Combobox.Option
                  key={item.id}
                  value={{
                    id: item.id,
                    text: `${item.firstName} ${item.lastName}`,
                  }}
                  className="px-4 py-3 text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 text-xs"
                >
                  {item.firstName.toUpperCase()} {item.lastName.toUpperCase()}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
    </>
  );
};
