import { useState, useEffect } from "react";
import "../Banner/BannerStyle.css";
import { BannerProps } from "../../Utils/BannerImages";

export interface BannerFavoritesProps {
  images: BannerProps[];
}

const BannerFavorites: React.FC<BannerFavoritesProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(intervalId);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <section className="section-banner">
      {images.map((img, index) => (
        <img
          key={index}
          src={img.url}
          alt={`Banner ${index}`}
          className={`banner-img ${index === currentIndex ? "active" : ""}`}
        />
      ))}
    </section>
  );
};
export default BannerFavorites;
