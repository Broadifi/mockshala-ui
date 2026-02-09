import { Link, useParams } from "@tanstack/react-router";

import { NoResultFoundImg } from "@/assets";

import DefaultButton from "@/components/customButtons/defaultButton";

export default function NoResultFound() {
  //Fetch the language params
  const { lang } = useParams({ strict: false });

  const homepageLink = lang ?? "en";

  return (
    <div className="w-full bg-white rounded-2xl flex p-4 flex-col items-center">
      <img src={NoResultFoundImg} alt="no result found" className="w-sm" />
      <div className="space-y-2">

      <h3 className="uppercase font-semibold">No results found</h3>
      <Link
        to="/$lang/current-affairs"
        params={{ lang: homepageLink }}
        className="mt-2"
      >
        <DefaultButton> Remove filters</DefaultButton>
      </Link>
      </div>
    </div>
  );
}
