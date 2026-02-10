import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "@tanstack/react-router";

import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

import HtmlSetter from "@/components/htmlSetter";
import { Button } from "@/components/ui/button";

import { SkeletonCurrentAffairSingle } from "@/modules/current-affairs/components/skeletonCurrentAffairSingle";

import { IMAGE_BASE_URL } from "@/api/url";
import { formatDate } from "@/utils/formatting/formatDate";
import { fetchCurrentAffairBySlug } from "@/api/services/current-affairs.services";

function CurrentAffairsDetails() {
  const router = useRouter();
  const { lang, slug } = useParams({ from: "/$lang/current-affairs/$slug/" });

  const { data, isLoading } = useQuery({
    queryKey: ["currentAffair", { slug }],
    queryFn: () => fetchCurrentAffairBySlug(slug),
  });

  const fetchData = data?.data;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <section
      className={`w-full p-4 overflow-y-auto pb-10 max-w-5xl mx-auto  ${isLoading ? "min-h-screen" : "h-fit"}`}
    >
      <Button
        variant={"link"}
        onClick={() => router.history.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeft /> <p>Back to Articles</p>
      </Button>
      
      {isLoading && <SkeletonCurrentAffairSingle />}
      <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900">
        {lang === "en" ? fetchData?.title : fetchData?.titleInHindi}
      </h2>
      <p className="text-sm text-zinc-600 my-2">
        {formatDate(fetchData?.publishedDate ?? "")}
      </p>
      <img
        src={`${IMAGE_BASE_URL}${fetchData?.image}`}
        alt={fetchData?.title}
      />
      <div>
        {data && (
          <HtmlSetter
            html={
              (lang === "en"
                ? fetchData?.description
                : fetchData?.descriptionInHindi) ?? ""
            }
          />
        )}
      </div>
      <div className="flex w-full justify-center pt-5">
        <Button
          variant={"outline"}
          onClick={() => router.history.back()}
          className="flex items-center gap-2 "
        >
          <ArrowLeft /> <p>Back to Articles</p>
        </Button>
      </div>
    </section>
  );
}

export default CurrentAffairsDetails;
