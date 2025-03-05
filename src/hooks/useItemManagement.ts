import { useState } from "react";
import { foodItems } from "../data/mocks/foodItems";

export const useItemManagement = () => {
  const initialItems = foodItems.map((item) => item.name);
  const [items, setItems] = useState(initialItems);
  const [vegetables, setVegetables] = useState<string[]>([]);
  const [fruits, setFruits] = useState<string[]>([]);

  const moveItem = (item: string, category: "vegetable" | "fruit") => {
    setItems((prev) => prev.filter((i) => i !== item));

    if (category === "vegetable") {
      setVegetables((prev) => [...prev, item]);
    } else {
      setFruits((prev) => [...prev, item]);
    }
  };

  const returnItem = (item: string, category: "vegetable" | "fruit") => {
    if (category === "vegetable") {
      setVegetables((prev) => prev.filter((i) => i !== item));
    } else {
      setFruits((prev) => prev.filter((i) => i !== item));
    }
    setItems((prev) => [...prev, item]);
  };

  return { items, vegetables, fruits, moveItem, returnItem };
};
