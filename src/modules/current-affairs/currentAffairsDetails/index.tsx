import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

// import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

import HtmlSetter from "@/components/htmlSetter";
// import { Button } from "@/components/ui/button";

import { SkeletonCurrentAffairSingle } from "@/modules/current-affairs/components/skeletonCurrentAffairSingle";

import { IMAGE_BASE_URL } from "@/api/url";
import { formatDate } from "@/utils/formatting/formatDate";
import { fetchCurrentAffairBySlug } from "@/api/services/current-affairs.services";
import { useNewsLanguage } from "@/stores/testStore";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Copy, Share } from "@/assets";
import { Calendar } from "lucide-react";

function CurrentAffairsDetails() {
  //   const router = useRouter();
  const { lang, slug } = useParams({ from: "/$lang/current-affairs/$slug/" });

  const { data, isLoading } = useQuery({
    queryKey: ["currentAffair", { slug }],
    queryFn: () => fetchCurrentAffairBySlug(slug),
  });

  const fetchData = data?.data;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  //   console.log(fetchData);

  //fetch current select language from the previous current affair dashboard
  const { currentLang, setLanguage } = useNewsLanguage();

  return (
    <div className="gradient-soft-blue-current-affairs">
      <section
        className={`w-full container mx-auto px-4 py-4 ${isLoading ? "min-h-screen" : "h-fit"}`}
      >
        {isLoading && <SkeletonCurrentAffairSingle />}

        <div className="pt-8 flex flex-col gap-5">
          {/* tags */}
          <div className="flex gap-3 ">
            {fetchData?.tags.map((tag) => (
              <Badge className="bg-button-blue">{tag}</Badge>
            ))}
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-title-darkblue ">
              {lang === "en" ? fetchData?.title : fetchData?.titleInHindi}
            </h2>
          </div>

          {/* Date and actions */}
          <div className="flex justify-between pb-3 mb-2 border-b">
            <div className="flex gap-1 items-center ">
              <Calendar size={20} className="text-title-gradient-blue" />
              <p className="text-sm text-title-darkblue">
                {formatDate(fetchData?.publishedDate ?? "")}
              </p>
            </div>

            <div className="flex   items-center gap-4">
              <div className="flex gap-1 items-center bg-blue-100/50 rounded-lg px-2 ">
                <h2 className="text-sm text-title-darkblue">Languages: </h2>

                <Select defaultValue={currentLang} onValueChange={setLanguage}>
                  <SelectTrigger
                    className="
                        border-0
                        shadow-none
                        bg-transparent
                        focus:ring-0
                        focus:ring-offset-0
                        focus:outline-none
                        focus-visible:ring-0
                        focus-visible:outline-none
                        "
                  >
                    <SelectValue placeholder="Select a language" className="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Languages</SelectLabel>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 items-center">
                <button className="cursor-pointer">
                  <img src={Copy} alt="questions" className="h-6 shadow-2xl" />
                </button>
              </div>
              <div className="flex gap-2 items-center">
                <button className="cursor-pointer">
                  <img src={Share} alt="questions" className="h-6 shadow-2xl" />
                </button>
              </div>

              <div className="flex gap-2 items-center">
                <button className="cursor-pointer">
                  <img
                    src={Bookmark}
                    alt="questions"
                    className="h-6 shadow-2xl"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Description section */}

          <div className="grid grid-cols-12 gap-8 ">
            {/* Image */}
            <div className="col-span-6">
              <img
                src={`${IMAGE_BASE_URL}${fetchData?.image}`}
                alt={fetchData?.title}
                className="w-full rounded-lg"
              />
            </div>

            {/* Description */}
            <div className="col-span-6">
              {data && (
                <HtmlSetter
                  html={
                    (lang === "en"
                      ? fetchData?.description
                      : fetchData?.descriptionInHindi) ?? ""
                  }
                />

                // <div
                //   dangerouslySetInnerHTML={{
                //     __html: fetchData?.description ?? "",
                //   }}
                // />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CurrentAffairsDetails;
