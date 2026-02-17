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
    <div className="flex flex-col gap-5 text-subtitle-gray text-sm">
      {popularTestData?.data.map((item) => (
        <Link
          to={"/$lang/exams/$examCategory/$testSlug"}
          params={{
            lang: lang,
            examCategory: item.examCategory.slug,
            testSlug: item.slug,
          }}
          className="hover:text-button-blue"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default FooterPopularTests;
