import { useState, useEffect, useRef } from "react";
import "../Banner/BannerStyle.css";
import { BannerProps } from "../../Utils/BannerImages";
import { Movie } from "../../Contexts/Movies/MovieInterface";

export interface BannerComponentProps {
  images: BannerProps[];
  text?: string;
  movies: Movie[];
  setMoviesSearch: React.Dispatch<React.SetStateAction<Movie[]>>;
  setIsloading: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const BannerSearch: React.FC<BannerComponentProps> = ({
  images,
  text,
  movies,
  setMoviesSearch,
  setIsloading,
  setCurrentPage,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState<string>(text || ""); // valor controlado
  const hasFirstFilterRun = useRef(false); // garante que o `text` inicial filtre só 1x

  const filtrarBusca = (value: string) => {
    setIsloading(true);
    const lower = value.toLowerCase();
    const newAllMovies = movies.filter((video) =>
      video.title.toLowerCase().includes(lower)
    );
    setMoviesSearch(newAllMovies);
    setIsloading(false);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (text && !hasFirstFilterRun.current) {
      filtrarBusca(text);
      hasFirstFilterRun.current = true;
    }
  }, [text, movies]);

  useEffect(() => {
    filtrarBusca(inputValue);
  }, [movies]);

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
      <div className="div-input-search">
        <div>
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              filtrarBusca(e.target.value);
            }}
            placeholder="pesquisar"
            type="text"
            className="input-search"
          />
        </div>
      </div>
    </section>
  );
};
export default BannerSearch;
