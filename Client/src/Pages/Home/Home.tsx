import React, { useEffect } from "react";
import "./HomeStyle.css";
import Header from "../../Components/Header/Header";
import GeneralSection from "../../Components/GeneralSection/GeneralSection";
import Banner from "../../Components/Banner/Banner";
import CategoryesMovie from "../../Components/CategoryesMovies/CategoryesMovie";
import Loading from "../../Components/Loading/Loading";
import Footer from "../../Components/Footer/Footer";
import { imagesbanner } from "../../Utils/BannerImages";
import { useMovies } from "../../Contexts/Movies/useMovies";

const Home: React.FC = () => {
  const { fetchMovies, fetchReactions, fetchFavorites } = useMovies();
  const categories = useMovies().movies;

  useEffect(() => {
    fetchMovies();
    fetchReactions();
    fetchFavorites();
  }, []);

  return (
    <GeneralSection>
      <Header />
      <Banner images={imagesbanner} />
      <section className="container-home">
        {categories.length === 0 ? (
          <Loading padding={300} color="red" size={100} />
        ) : (
          categories.map((category) => (
            <CategoryesMovie
              key={category.id}
              category={category.name}
              movies={category.movies}
            />
          ))
        )}
      </section>
      <Footer />
    </GeneralSection>
  );
};

export default Home;
