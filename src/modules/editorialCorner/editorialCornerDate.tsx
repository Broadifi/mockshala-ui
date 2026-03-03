import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchEdtiorialCornerByDate } from "@/api/services/editorial-corner.service";
import type { EditorialCornerData } from "@/api/model/editorial-corner";

const FetchEdtiorialCornerByDate = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["filteredData", startDate, endDate],
    queryFn: () => fetchEdtiorialCornerByDate(startDate, endDate),
    enabled: false, 
  });
  console.log(data?.data);

  const handleSearch = () => {
    if (startDate && endDate) {
      refetch();
    }
  };

  return (
    <div className="my-7 mx-3 pt-3">


      <div className="flex  mb-4 text-subtitle-gray">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong!</p>}

      {data?.data.map((item: EditorialCornerData) => (
        <div key={item.id} className="border p-3 mb-2 rounded">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FetchEdtiorialCornerByDate;