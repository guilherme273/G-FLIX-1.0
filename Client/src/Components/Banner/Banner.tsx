import { useState, useEffect } from "react";
import "./BannerStyle.css";
import { Search } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BannerProps } from "../../Utils/BannerImages";
import LogoTop from "../LogoTop/LogoTop";
//oi
interface InputSearch {
  textSearch: string;
}

export interface BannerComponentProps {
  images: BannerProps[];
}

const Banner: React.FC<BannerComponentProps> = ({ images }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputSearch>();

  const search: SubmitHandler<InputSearch> = (data: InputSearch) => {
    navigate("/search", { state: { termo: data.textSearch } });
  };

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
    <>
      <LogoTop />
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
          <form onSubmit={handleSubmit(search)} action="">
            <button type="submit" title="pesquisar">
              <Search className="icon-input-search" />
            </button>
            <div className="div-input-and-error">
              <input
                type="text"
                {...register("textSearch", { required: true })}
                className="input-search"
              />
              {errors?.textSearch?.type === "required" && (
                <p className="p-alert-input-search">
                  Digite algo para pesquisar
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Banner;
