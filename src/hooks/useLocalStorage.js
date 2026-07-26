import { useState } from "react";

export default function useLocalStorage(
  key,
  defaultValue
) {
  const [value, setValue] = useState(() => {
    const stored =
      localStorage.getItem(key);

    return stored
      ? JSON.parse(stored)
      : defaultValue;
  });

  const saveValue = (newValue) => {
    setValue(newValue);

    localStorage.setItem(
      key,
      JSON.stringify(newValue)
    );
  };

  return [value, saveValue];
}