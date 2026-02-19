import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { plansKeys } from "@/api";
import { fetchPlansData } from "@/api/services/plans.service";
import { useTranslation } from "react-i18next";
import ViewAllButton from "@/components/customButtons/viewAllButton";
import HtmlSetterPlans from "@/components/htmlSetterPlans";

function Plans() {
  const { t } = useTranslation();

  const { data, error, isLoading } = useQuery({
    queryKey: plansKeys.plansDetails(),
    queryFn: () => fetchPlansData(),
  });

  const plansData = data?.data;
    const dataLength = plansData?.length ?? 0

  // console.log(plansData?.length);
  

  const [selected, setSelected] = useState<{ [planId: string]: string[] }>({});

  const handleSelect = (planId: string, testId: string, max: number) => {
    const currentSelected = selected[planId] || [];

    if (currentSelected.includes(testId)) {
      setSelected({
        ...selected,
        [planId]: currentSelected.filter((item) => item !== testId),
      });
    } else if (currentSelected.length < max) {
      setSelected({
        ...selected,
        [planId]: [...currentSelected, testId],
      });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full py-10 flex justify-center items-center text-green-500">
        <Loader className="animate-spin" />
        <p className="ml-2">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-10 flex justify-center items-center">
        <p className="text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <section className="gradient-soft-blue-current-affairs">
      <div className="w-full container px-4 py-5 mx-auto space-y-12">
        
        {/* ================= STUDENT PLANS ================= */}
        {
            dataLength > 1 && 
        
        <div>
          <div className="text-center w-full py-2 md:py-5">
            <h2 className="text-2xl xl:text-4xl font-bold mb-4 md:mb-6 bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
              {t("studentPlan")}
            </h2>
          </div>

          <div className="flex flex-wrap gap-8 md:gap-10 w-full justify-center items-stretch">
            {plansData
              ?.filter((plan) => !plan?.isUnlimited)
              .map((plan) => {
                const currentSelected = selected[plan._id] || [];

                return (
                  <div
                    key={plan._id}
                    className="px-4 py-4 max-w-md w-full bg-gray-50 rounded-2xl shadow-xl overflow-hidden group border border-gray-100 hover:border-blue-300 transition-all hover:scale-[1.02]"
                  >
                    <div className="rounded-2xl bg-linear-to-tl from-[#b2d1f0] via-[#f5f4ef] to-[#e3d2ee]">

                      {/* Title */}
                      <div className="flex px-4 py-2 md:py-3">
                        <h3 className="text-xl md:text-2xl font-bold tracking-wider text-subtitle-gray group-hover:text-[#113F67]">
                          {plan.name}
                        </h3>
                      </div>

                      {/* Pricing */}
                      <div className="px-4 py-2 mb-2 flex justify-between">
                        <div>
                          <span className="line-through text-xl text-title-gradient-blue">
                            ₹{plan.mrpPrice}
                          </span>
                          <div className="text-3xl md:text-4xl text-blue-700 font-bold">
                            ₹{plan.price}
                          </div>
                        </div>

                        <div className="flex items-end">
                          <div className="text-sm bg-yellow-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                            Best Value ₹{plan.flatDiscount} Off
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="px-2 md:px-4 py-1 md:py-3">
                        <div className="border border-white px-4 py-2 rounded-xl bg-white/50 backdrop-blur">
                          <p className="text-center text-violet-700 font-medium mb-4">
                            {plan.duration} Days Access • Choose Any {plan.max}
                          </p>

                          <div className="space-y-2 h-32 overflow-y-auto">
                            {plan?.testSeries?.map((item) => {
                              const isChecked = currentSelected.includes(item._id);
                              const disableCheckbox =
                                !isChecked && currentSelected.length >= (plan.max ?? 0);

                              return (
                                <div key={item._id} className="flex items-center gap-3">
                                  <Checkbox
                                    checked={isChecked}
                                    disabled={disableCheckbox}
                                    onCheckedChange={() =>
                                      handleSelect(plan._id, item._id, plan.max ?? 0)
                                    }
                                  />
                                  <span
                                    className={`text-sm md:text-base ${
                                      disableCheckbox ? "text-gray-400" : "text-gray-700"
                                    }`}
                                  >
                                    {item.name}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="flex justify-center py-3 md:py-4">
                        <ViewAllButton>Choose This Plan</ViewAllButton>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="px-4 py-4 h-50 overflow-y-auto">
                      <HtmlSetterPlans html={plan.description} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

            }

        {/* ================= UNLIMITED PLANS ================= */}
        <div className="pb-4 md:pb-6">
          <div className="text-center w-full pt-4 md:pt-8">
            <h2 className="text-2xl xl:text-4xl font-bold mb-4 md:mb-6 bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
              {t("unlimitedPlan")}
            </h2>
          </div>

          <div className="flex flex-wrap gap-10 w-full justify-center items-stretch">
            {plansData
              ?.filter((plan) => plan?.isUnlimited)
              .map((plan) => (
                <div
                  key={plan._id}
                  className="px-4 py-4 max-w-md w-full bg-gray-50 rounded-2xl shadow-xl overflow-hidden group border border-gray-100 hover:border-blue-300 transition-all hover:scale-[1.02]"
                >
                  <div className="rounded-2xl bg-linear-to-tl from-[#b2d1f0] via-[#f5f4ef] to-[#e3d2ee]">

                    {/* Title */}
                    <div className="flex px-4 py-2 md:py-3">
                      <h3 className="text-xl md:text-2xl font-bold tracking-wider text-subtitle-gray group-hover:text-[#113F67]">
                        {plan.name}
                      </h3>
                    </div>

                    {/* Pricing */}
                    <div className="px-4 py-2 mb-2 flex justify-between">
                      <div>
                        <span className="line-through text-xl text-title-gradient-blue">
                          ₹{plan.mrpPrice}
                        </span>
                        <div className="text-3xl md:text-4xl text-blue-700 font-bold">
                          ₹{plan.price}
                        </div>
                      </div>

                      <div className="flex items-end">
                        <div className="text-sm bg-yellow-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                          Best Value ₹{plan.flatDiscount} Off
                        </div>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="px-4 pb-3 md:pb-6 text-center text-violet-700 font-medium">
                      {plan.duration} Days Unlimited Access
                    </div>

                    {/* Button */}
                    <div className="flex justify-center pb-3 md:pb-4">
                      <ViewAllButton>Choose This Plan</ViewAllButton>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-4 py-6 h-80 md:h-auto overflow-y-auto">
                    <HtmlSetterPlans html={plan.description} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Plans;