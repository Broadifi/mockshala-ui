import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";

import HtmlSetter from "@/components/htmlSetter";
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
        <Loader />
        <p>Loading...</p>
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
    <section className=" gradient-soft-blue-current-affairs">
      <div className="w-full container px-4 py-5 mx-auto space-y-4 md:space-y-10">
        {/* Heading */}
        {/* <div className="text-center md:text-start space-y-1 mb-12">
        <h3 className="inline-block py-1 text-xl sm:text-2xl xl:text-4xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
          {t("plans.title")}
        </h3>

        <p className="max-w-xl text-xs sm:text-sm xl:text-base text-gray-600 dark:text-gray-300">
          {t("plans.subtitle")}
        </p>
      </div> */}

        {/* student Plans */}
        <div>
          {/* Heading */}
          <div className="text-center w-full py-5">
            <h2 className="text-2xl xl:text-4xl font-bold mb-4 md:mb-8 bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
              {t("studentPlan")}
            </h2>
          </div>

          <div className="flex flex-wrap gap-10 lg:gap-15 w-full justify-center items-center">
            {plansData
              ?.filter((plan) => !plan?.isUnlimited)
              .map((plan) => {
                const currentSelected = selected[plan._id] || [];

                return (
                  <div
                    key={plan._id}
                    className="px-4 py-2 md:py-4 max-w-md w-full bg-gray-50 rounded-2xl transform hover:scale-101 transition-all 
                    shadow-xl overflow-hidden group border border-gray-100 hover:border-blue-300"
                  >
                    <div className="rounded-2xl bg-linear-to-tl from-[#b2d1f0] via-[#f5f4ef] to-[#e3d2ee]">
                      <div className="flex px-4 py-3 ">
                        <h3 className="text-xl md:text-2xl font-bold tracking-wider text-subtitle-gray group-hover:text-[#113F67]">
                          {plan.name}
                        </h3>
                      </div>

                      <div className="rounded-2xl ">
                        {/* Pricing Section */}
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
                            <div className="text-sm bg-yellow-100 backdrop-blur-sm text-green-800 px-3 py-1 rounded-full inline-block font-semibold">
                              Best Value ₹{plan.flatDiscount} Off
                            </div>
                          </div>
                        </div>

                        {/* Features Section */}
                        <div className="px-4 py-3 w-full">
                          <div className="border border-white px-4 py-2 rounded-xl backdrop-blur-lg bg-white/50">
                            <p className="text-center text-violet-700 font-medium text-sm sm:text-base mb-4">
                              {plan.duration} Days Access • Choose Any{" "}
                              {plan.max}
                            </p>
                            <div className="space-y-2 h-30 overflow-y-auto">
                              {plan?.testSeries?.map((item) => {
                                const isChecked = currentSelected.includes(
                                  item._id,
                                );
                                const disableCheckbox =
                                  !isChecked &&
                                  currentSelected.length >= (plan.max ?? 0);
                                return (
                                  <div
                                    key={item._id}
                                    className="flex items-center gap-3 text-sm text-white"
                                  >
                                    <Checkbox
                                      checked={isChecked}
                                      disabled={disableCheckbox}
                                      onCheckedChange={() =>
                                        handleSelect(
                                          plan._id,
                                          item._id,
                                          plan.max ?? 0,
                                        )
                                      }
                                      className="bg-white"
                                    />
                                    <span
                                      className={`text-sm md:text-base ${
                                        disableCheckbox
                                          ? "text-gray-500"
                                          : "text-gray-700"
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
                        <div className=" flex justify-center py-4 px-4">
                          <ViewAllButton>Choose This Plan</ViewAllButton>
                        </div>
                      </div>
                    </div>
                    {/* Additional Benefits */}
                    <div className="px-4 py-4 h-60 overflow-y-auto ">
                      <HtmlSetterPlans
                        html={plan.description}
                      ></HtmlSetterPlans>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* unlimited plans */}
        <div>
          <div className="text-center w-full pt-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-10 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
               {t("unlimitedPlan")}
            </h2>
          </div>

          <div className=" flex flex-wrap gap-10 w-full justify-center items-center">
            {plansData
              ?.filter((plan) => plan?.isUnlimited)
              .map((plan) => {
                return (
                  <div
                    key={plan._id}
                    className="px-4 py-2 md:py-4 max-w-md w-full bg-gray-50 rounded-2xl transform hover:scale-101 transition-all shadow-xl overflow-hidden group border border-gray-100 hover:border-blue-300"
                  >
                    <div className="rounded-2xl bg-linear-to-tl from-[#ccd0d4] via-[#f9fbfb] to-[#a4c1ea]">
                      <div className="flex px-4 py-3 md:py-4">
                        <h3 className="text-2xl md:text-3xl font-bold tracking-wider text-[#113F67] group-hover:text-[#0336a3]">
                          {plan.name}
                        </h3>
                      </div>

                      <div className=" rounded-2xl">
                        {/* Pricing Section */}
                        <div className="px-4 pb-2 md:pb-4 flex justify-between ">
                          <div className="flex flex-col justify-end ">
                            <div>
                              <span className="line-through text-xl text-blue-500">
                                ₹{plan.mrpPrice}
                              </span>
                            </div>
                            <div className="text-4xl md:text-5xl text-blue-700 font-bold">
                              ₹{plan.price}
                            </div>
                          </div>

                          <div className="space-y-1 md:space-y-3 ">
                            <div className="w-full flex justify-end ">
                              <p className="text-sm md:text-base text-violet-700 font-medium px-4 pt-4">
                                {plan.duration} Days Access
                              </p>
                            </div>
                            <div className="text-sm md:text-base bg-yellow-100 backdrop-blur-sm text-green-800 px-4 py-2 rounded-full inline-block font-semibold">
                              Best Value ₹{plan.flatDiscount} Off
                            </div>
                          </div>
                        </div>

                        {/* Button */}
                        <div className="w-full flex justify-center py-4 px-4">
                          <button className="w-full bg-linear-to-r from-blue-500 to-sky-500 px-6 py-1 shadow-sm text-white font-semibold text-lg rounded-md border border-white transition ease-in-out hover:shadow-lg hover:scale-105">
                            Choose This Plan →
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Additional Benefits */}
                    <div className="px-4 py-6  ">
                      <HtmlSetter html={plan.description}></HtmlSetter>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Plans;
