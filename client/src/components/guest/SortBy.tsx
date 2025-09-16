import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectLabel } from "@radix-ui/react-select";

type sort={
  setSort: Dispatch<SetStateAction<string>>;
}

const sorts = [
  { id: "Low to High", name: "Low to High" },
  { id: "High to Low", name: "High to Low" },
];

const SortBy = ({setSort}:sort) => {
  return (
    <Select onValueChange={(value)=>setSort(value)}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          {sorts.map((item) => (
            <SelectItem value={item.id} key={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortBy;
