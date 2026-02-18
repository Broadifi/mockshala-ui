import { homeQueryKey } from "@/api";
import { QUERY_CONFIG } from "@/api/config";
import { homeAPI } from "@/api/services/getHomeData";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";

function FooterPopularTests() {
  const { data: popularTestData } = useQuery({
    queryKey: homeQueryKey.popularTests(),
    queryFn: homeAPI.getPopularTestData,
    ...QUERY_CONFIG.static,
  });

  const { lang } = useParams({ from: "/$lang" });

  return (
   <ul className="space-y-3 lg:space-y-4 text-sm">
  {popularTestData?.data.map((item) => (
    <li key={item.slug} className="flex gap-2 items-start">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-title-gradient-blue"></span>
      <Link
        to={"/$lang/exams/$examCategory/$testSlug"}
        params={{
          lang: lang,
          examCategory: item.examCategory.slug,
          testSlug: item.slug,
        }}
        className="text-subtitle-gray text-sm hover:text-button-blue"
      >
        {item.name}
      </Link>
    </li>
  ))}
</ul>
  );
}

export default FooterPopularTests;
