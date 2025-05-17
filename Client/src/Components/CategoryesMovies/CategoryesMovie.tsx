import { Movie } from "../../Contexts/Movies/MovieInterface";
import SectionCarousel from "../SectionCarousel/SectionCarousel";
import "./CategoryesMovieStyle.css";

interface propsCategoryMovie {
  movies: Movie[];
  category: string;
}

const CategoryesMovie: React.FC<propsCategoryMovie> = ({
  movies,
  category,
}) => {
  return (
    <>
      <section className="category-movie">
        <h4 className="category-title">{category}</h4>
        <SectionCarousel movies={movies} />
      </section>
    </>
  );
};

export default CategoryesMovie;
