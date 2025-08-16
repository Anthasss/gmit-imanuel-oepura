import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import UppCard from "@/components/upp/uppCard"
import newsData from "@/json/news.json"

export default function NewsRow() {
  return (
    <div className="w-full px-4 md:px-8 py-8 bg-gray-300">
      <div className="max-w-full overflow-hidden">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {newsData.map((news) => (
              <CarouselItem key={news.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <UppCard
                  title={news.title}
                  image={news.image}
                  description={news.description}
                  date={news.date}
                  time={news.time}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="relative left-0 top-0" />
            <CarouselNext className="relative right-0 top-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}