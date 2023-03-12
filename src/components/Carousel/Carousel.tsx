import clsx from "clsx";
import { Pagination, Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";

import styles from "./Carousel.module.scss";

const Carousel: React.FC<CarouselProps> = ({ components, className, ...props }) => {
  return (
    <div className={clsx(className, styles.root)}>
      <Swiper
        spaceBetween={40}
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        {...props}
      >
        {components.map((component, index) => (
          <SwiperSlide key={index}>{component}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

type CarouselProps = SwiperProps & {
  components: any[];
  className?: string;
};

export default Carousel;
