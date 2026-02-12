import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

import { useEffect } from "react";

import HtmlSetter from "@/components/htmlSetter";

import { SkeletonCurrentAffairSingle } from "@/modules/current-affairs/components/skeletonCurrentAffairSingle";

import { IMAGE_BASE_URL } from "@/api/url";
import { formatDate } from "@/utils/formatting/formatDate";
import { fetchCurrentAffairBySlug } from "@/api/services/current-affairs.services";

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
import { Copy } from "@/assets";
import { Calendar } from "lucide-react";
import { useGlobalLanguage } from "@/stores/globalLanguageStore";
import SimilarCurrentAffairs from "./similarCurrentAffairs";
import CurrentAffairsActions from "./currentAffairsActions";
import { toast} from "sonner";

function CurrentAffairsDetails() {
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
  const { currentLang, setLanguage } = useGlobalLanguage();

  useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);


  //Copy the URL
 function handleCopyButton() {
  const fullUrl = window.location.href;

  navigator.clipboard.writeText(fullUrl)
    .then(() => {
      // console.log("Copied:", fullUrl);
      // optional toast
      toast.success("Link copied to clipboard!");
    })
    .catch(() => {
      toast.error("Failed to copy");
    });
}

  return (
    <div className="gradient-soft-blue-current-affairs">
      <section
        className={`w-full container mx-auto px-4 py-4 ${isLoading ? "min-h-screen" : "h-fit"}`}
      >
        {isLoading && <SkeletonCurrentAffairSingle />}

        <div className="pt-4 md:pt-8 flex flex-col gap-5">
          {/* Actions */}
          <div className="flex md:hidden items-center justify-end">
            <CurrentAffairsActions />
          </div>

          {/* tags */}
          <div className="flex gap-3 ">
            {fetchData?.tags.map((tag) => (
              <Badge className="bg-button-blue">{tag}</Badge>
            ))}
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-title-darkblue ">
              {currentLang === "en"
                ? fetchData?.title
                : fetchData?.titleInHindi}
            </h2>
          </div>

          {/* Date and actions */}
          <div className="flex justify-between pb-3 mb-2 border-b">
            <div className="flex gap-1  items-center">
              <Calendar size={20} className="text-title-gradient-blue" />
              <p className="text-sm text-title-darkblue">
                {formatDate(fetchData?.publishedDate ?? "")}
              </p>
            </div>

            <div className="flex gap-2  md:gap-4">
              {/* Language section */}
              <div className="flex md:gap-1  items-center   ">
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

              {/* Actions */}
              <div className="flex gap-2 md:gap-4">
                {/* Copy */}
                <div className="hidden md:flex gap-2 items-center">
                  <button className="cursor-pointer" 
                    onClick={()=>handleCopyButton()}
                    >
                    <img
                      src={Copy}
                      alt="questions"
                      className="h-5 md:h-6 shadow-2xl"
                    />
                  </button>
                </div>

                <div className="hidden md:flex items-center">
                  <CurrentAffairsActions />
                </div>
              </div>
            </div>
          </div>

          {/* Description section */}

          <article className="leading-relaxed ">
            <img
              src={`${IMAGE_BASE_URL}${fetchData?.image}`}
              alt={fetchData?.title}
              className="
              float-left
              w-full          
              lg:w-xl
              xl:w-3xl
              lg:mr-8
              xl:mr-10
              mb-4
              rounded-lg
              shadow
            "
            />

            {data && (
              <HtmlSetter
                html={
                  (currentLang === "en"
                    ? fetchData?.description
                    : fetchData?.descriptionInHindi) ?? ""
                }
              />
            )}
          </article>
        </div>

        <SimilarCurrentAffairs id={data?.data._id} />
      </section>

     
    </div>
  );
}

export default CurrentAffairsDetails;
