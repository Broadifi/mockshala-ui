import { queryKeys } from "@/api";
import { QUERY_CONFIG } from "@/api/config";
import { homeAPI } from "@/api/services/getHomeData";
import { useQuery } from "@tanstack/react-query";

function FooterExamCategory() {
  const { data } = useQuery({
    queryKey: queryKeys.home.paidTestCategories(),
    queryFn: homeAPI.getDashboardPaidCategories,
    ...QUERY_CONFIG.static,
  });

  return (
    <ul className="space-y-3 lg:space-y-4 text-sm">
      {data?.data.featureCategories.map((item) => (
        <li key={item.slug} className="flex gap-2 items-start">
          {/* custom bullet */}
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-title-gradient-blue"></span>

          {/* text */}
          <p className="text-subtitle-gray text-sm hover:text-button-blue cursor-pointer">
            {item.categoryName}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default FooterExamCategory;