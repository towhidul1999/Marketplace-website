import { Select } from "antd";
import React, { useState } from "react";

const AllCardTopFilters = ({ data }) => {
  const [sortBy, setSortBy] = useState("");

  const handleChange = (value) => {
    setSortBy(value.value);
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center ">
        <span>Sort by: </span>
        <Select
          labelInValue
          className="w-[140px] md:w-[180px] md:h-[30px] "
          defaultValue={{
            value: "Best selling",
            label: "Best selling",
          }}
          onChange={handleChange}
          options={[
            {
              value: "Relevance",
              label: "Relevance",
            },
            {
              value: "Best selling",
              label: "Best selling",
            },
            {
              value: "Newest arrivals",
              label: "Newest arrivals",
            },
          ]}
        />
      </div>
      <div className="cursor-pointer font-bold">{data?.length} Results</div>
    </div>
  );
};

export default AllCardTopFilters;
