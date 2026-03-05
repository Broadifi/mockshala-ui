import { Link, useParams } from "@tanstack/react-router";
import type React from "react";
import { NoResultFoundImg } from "@/assets";

// import DefaultButton from "@/components/customButtons/defaultButton";
type NoResultFoundProps = {
  setStartSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setEndSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};
export default function NoResultFound({setStartSelectedDate,setEndSelectedDate}:NoResultFoundProps) {
  //Fetch the language params
  const { lang } = useParams({ strict: false });
  function handleRemoveFilter(){
    setStartSelectedDate(undefined);
    setEndSelectedDate(undefined);
  }
  const homepageLink = lang ?? "en";

  return (
    <div className="w-full bg-white rounded-2xl flex p-4 flex-col items-center justify-center ">
      <img src={NoResultFoundImg} alt="no result found" className="w-sm" />
      <div className="space-y-5 flex-col items-center justify-center my-3">

      <h3 className="uppercase font-semibold">No results found</h3>
      <Link
        to="/$lang/editorials-corner"
        params={{ lang: homepageLink }}
        className="mt-5 bg-button-blue rounded-full p-3 text-amber-50"
          onClick={handleRemoveFilter}
      >
        Remove filters
      </Link>
      </div>
    </div>
  );
}
