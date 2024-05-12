import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface BillboardProps {
  data: Billboard[];
}

export const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <Carousel>
      <CarouselContent>
        {data.map((billboard) => (
          <CarouselItem
            key={billboard.id}
            className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
          >
            <Image
              src={billboard.billboard_image.url}
              alt="billboard"
              fill
              priority
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
