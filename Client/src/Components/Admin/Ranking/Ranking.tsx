import { motion } from "framer-motion";

import { Medal } from "lucide-react";
import "./Ranking.css";
import { MovieTable } from "../../../Contexts/Movies/MovieInterface";
import Loading from "../../Loading/Loading";

interface RankingProps {
  top10MostViewed: MovieTable[] | undefined;
  title: string;
}
const Ranking: React.FC<RankingProps> = ({ top10MostViewed, title }) => {
  return (
    <>
      <motion.div
        className="p-8 bg-opacity-50 border shadow-lg section-start-card backdrop-blur-md rounded-xl overflow-auto max-h-[450px] scrollbar-thin"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col w-full h-full">
          <h2 className="mb-4 text-lg font-medium text-center text-gray-100">
            {title}
          </h2>
          {top10MostViewed ? (
            top10MostViewed?.map((movie: MovieTable, index) => {
              return (
                <div
                  key={movie.id}
                  className="grid grid-cols-[1fr_6fr_1fr] gap-4 w-full justify-center items-center p-2 border-b-[0.1px] border-t-[0.1px] border-gray-700"
                >
                  <div className="flex items-center justify-center w-10 h-10 font-semibold text-gray-100 rounded-full bg-gradient-to-r from-purple-400 to-blue-500">
                    <img
                      src={`${movie.cover}`}
                      alt=""
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <p className="text-gray-100">
                    {movie.title.split(" ").slice(0, 6).join(" ")}
                  </p>
                  <strong className="text-gray-100 ">
                    {index == 0 ? <Medal color="yellow" /> : index + 1 + "º"}
                  </strong>
                </div>
              );
            })
          ) : (
            <Loading color="red" size={50} padding={5} />
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Ranking;
