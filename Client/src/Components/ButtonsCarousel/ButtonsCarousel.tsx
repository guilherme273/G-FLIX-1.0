import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ButtonsCarouselStyle.css";

interface ButtonsCarouselProps {
  scrollLeft: (e: React.MouseEvent<HTMLButtonElement>) => void;
  scrollRight: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonsCarousel: React.FC<ButtonsCarouselProps> = ({
  scrollLeft,
  scrollRight,
}) => {
  return (
    <>
      <div className="buttons">
        <button onClick={(e) => scrollLeft(e)}>
          <ChevronLeft size={40} />
        </button>
        <button onClick={(e) => scrollRight(e)}>
          <ChevronRight size={40} />
        </button>
      </div>
    </>
  );
};

export default ButtonsCarousel;
