import { queryKeys } from "@/api";
import { fetchEditorialCorners } from "@/api/services/editorial-corner.service";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

function EditorialCornerHome() {
    const { t } = useTranslation();

    const {data} = useQuery({
      queryKey: queryKeys.editorialsCornerKeys.editorialsCornerDetails(1,5),
      queryFn: ()=> fetchEditorialCorners({page:1, limit:5})
    })

    console.log(data);
    

  return (
    <div className="w-full container px-4 py-5 mx-auto lg:mt-20">
           {/* Heading */}
        <div className="text-center md:text-start space-y-1 lg:shrink-0">
          <h3 className="inline-block py-1 text-xl sm:text-2xl xl:text-4xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
            {t("editorialCorner.title")}
          </h3>

          <p className="max-w-xl text-xs sm:text-sm xl:text-base text-gray-600 dark:text-gray-300">
            {t("editorialCorner.subtitle")}
          </p>
        </div>
    </div>
  )
}

export default EditorialCornerHome