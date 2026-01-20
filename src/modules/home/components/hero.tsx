import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { homeQueryKey } from "@/api";
import { homeAPI } from "@/api/services/getHomeData";
import { DATA_TYPE_CONFIG } from "@/api/config";
import { IMAGE_BASE_URL } from "@/api/url";

export default function Hero() {
  const sliderRef = React.useRef(null);

  const { data: bannerData } = useQuery({
    queryKey: homeQueryKey.banner(),
    queryFn: homeAPI.getBannerData,

    ...DATA_TYPE_CONFIG.banner,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  React.useEffect(() => {
    if (bannerData) {
      console.log("Banner data:", bannerData);
    }
  }, [bannerData]);

  const autoplay = React.useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const updateDots = () => {
      setCurrent(api.selectedScrollSnap());
    };

    updateDots();

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    api.on("init", updateDots);

    return () => {
      api.off("select", updateDots);
      api.off("init", updateDots);
    };
  }, [api]);

  const handleMouseEnter = () => {
    autoplay.current.stop();
  };

  const handleMouseLeave = () => {
    autoplay.current.reset();
  };

  return (
    <div>
      {/* for Mobile Screen */}
      <div className="relative w-full flex md:hidden">
        <Carousel
          setApi={setApi}
          plugins={[autoplay.current]}
          opts={{ loop: true }}
          className="w-full relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContent>
            {bannerData?.data.map((item) => (
              <CarouselItem key={item._id}>
                {/* HERO SLIDE */}
                <div className="relative w-full">
                  <img
                    src={IMAGE_BASE_URL + item.imageForMobile}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows */}
          <CarouselPrevious className="absolute left-5 bg-white/70 hover:bg-white" />
          <CarouselNext className="absolute right-5 bg-white/70 hover:bg-white" />
        </Carousel>

        {/* DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 pointer-events-auto">
          {Array.from({ length: bannerData?.data.length ?? 0 }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all z-30",
                current === index
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white",
              )}
            />
          ))}
        </div>
      </div>

      {/* for Large Screen */}
      <div
        ref={sliderRef}
        className="pt-5 relative w-full hidden md:flex"
      >
        <Carousel
          setApi={setApi}
          plugins={[autoplay.current]}
          opts={{ loop: true,
           
          containScroll: "trimSnaps",
          }}
          className="w-full relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContent className="-ml-1">
            {bannerData?.data.map((item) => (
              <CarouselItem
                key={item._id}
                className="pl-1 basis-[80%] md:basis-[80%]"
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl transition-all duration-700 ease-in-out",
                    current === bannerData.data.indexOf(item)
                      ? "scale-100 opacity-100"
                      : "scale-90 opacity-70"
                  )}
                >
                  <img
                    src={IMAGE_BASE_URL + item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>


          {/* Arrows */}
          <CarouselPrevious className="left-6 bg-white/80 hover:bg-white" />
          <CarouselNext className="right-6 bg-white/80 hover:bg-white" />
        </Carousel>

        {/* DOTS */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2 pointer-events-auto">
          {Array.from({ length: bannerData?.data.length ?? 0 }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all z-30",
                current === index
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}