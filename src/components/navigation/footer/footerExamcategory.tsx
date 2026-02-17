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
  <div className="flex flex-col gap-5 text-subtitle-gray text-sm">
    {
      data?.data.featureCategories.map((item)=>(
        <p className="cursor-pointer hover:text-button-blue">{item.categoryName}</p>
      ))
    }
  </div>
  );
}

export default FooterExamCategory;
