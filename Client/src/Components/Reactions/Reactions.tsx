import { Angry, Heart, Smile, ThumbsDown, ThumbsUp } from "lucide-react";
import { makeReaction } from "../../Modules/Reactions/Reactions.service";
import { useState } from "react";
import { useAuth } from "../../Contexts/Auth/UseAuth";
import { Reaction } from "../../Modules/Reactions/ReactionsInterface";
import "./Reactions.style.css";
import { useMovies } from "../../Contexts/Movies/useMovies";
import { Movie } from "../../Contexts/Movies/MovieInterface";

interface RactionsProps {
  movie: Movie;
}

const Reactions: React.FC<RactionsProps> = ({ movie }) => {
  const [loadingReaction, setLoadingReaction] = useState<boolean>(false);
  const { getUserID } = useAuth();
  const { getReactionsOfSomeMovie, fetchReactions } = useMovies();

  const getUserReactionType = (
    reactions: Reaction[] | undefined,
    userId: number | null | undefined
  ) => {
    const userReaction = reactions?.find(
      (reaction) => reaction.id_user === userId
    );
    return userReaction ? userReaction.id_reactions_type : null;
  };

  const SendReaction = async (id_reaction: number, id_movie: number) => {
    setLoadingReaction(true);
    const data = {
      id_reactions_type: id_reaction,
      id_movie,
    };
    await makeReaction(data);
    await fetchReactions();
    setLoadingReaction(false);
  };

  const userReactionType = getUserReactionType(
    getReactionsOfSomeMovie(movie.id),
    getUserID()
  );

  function countReactionsByType(
    reactions: Reaction[] | undefined,
    id_reactions_type: number
  ): number {
    return (reactions ?? []).filter(
      (reaction) => reaction.id_reactions_type === id_reactions_type
    ).length;
  }
  return (
    <>
      <div className="container-reactions">
        <div className="reaction-icons">
          {/* Like */}
          <div className="div-count-reaction">
            <p className="count-reaction">
              {countReactionsByType(getReactionsOfSomeMovie(movie.id), 1)}
            </p>
            {userReactionType === 1 ? (
              <img
                title="Remover Reação"
                onClick={() => SendReaction(1, movie.id)}
                className={`img-reaction-icon${
                  loadingReaction ? " disabled-icon-reaction" : ""
                }`}
                src="/assets/like.png"
                alt=""
              />
            ) : (
              <ThumbsUp
                onClick={() => SendReaction(1, movie.id)}
                className={`reaction-icon like-icon${
                  loadingReaction ? " disabled-icon-reaction" : ""
                }`}
              >
                <title>Reagir</title>
              </ThumbsUp>
            )}
          </div>

          {/* Dislike */}
          <div className="div-count-reaction">
            <p className="count-reaction">
              {" "}
              {countReactionsByType(getReactionsOfSomeMovie(movie.id), 2)}
            </p>
            {userReactionType === 2 ? (
              <img
                title="Remover Reação"
                onClick={() => SendReaction(2, movie.id)}
                className={`img-reaction-icon${
                  loadingReaction ? " disabled-icon-reaction" : ""
                }`}
                src="/assets/deslike.png"
                alt=""
              />
            ) : (
              <ThumbsDown
                onClick={() => SendReaction(2, movie.id)}
                className={`reaction-icon like-icon${
                  loadingReaction ? " disabled-icon-reaction" : ""
                }`}
              >
                <title>Reagir</title>
              </ThumbsDown>
            )}
          </div>

          {/* Love */}
          <div className="div-count-reaction">
            <p className="count-reaction">
              {" "}
              {countReactionsByType(getReactionsOfSomeMovie(movie.id), 3)}
            </p>
            {userReactionType === 3 ? (
              <img
                title="Remover Reação"
                onClick={() => SendReaction(3, movie.id)}
                className={`img-reaction-icon${
                  loadingReaction ? " disabled-icon-reaction" : ""
                }`}
                src="/assets/heart.png"
                alt=""
              />
            ) : (
              <Heart
                onClick={() => SendReaction(3, movie.id)}
                className={`reaction-icon heart-icon${
                  loadingReaction ? " disabled-icon-reaction" : ""
                }`}
              >
                <title>Reagir</title>
              </Heart>
            )}
          </div>

          {/* Smile */}
          <div className="div-count-reaction">
            <p className="count-reaction">
              {" "}
              {countReactionsByType(getReactionsOfSomeMovie(movie.id), 4)}
            </p>
            {userReactionType === 4 ? (
              <img
                title="Remover Reação"
                onClick={() => SendReaction(4, movie.id)}
                className={`img-reaction-icon${
                  loadingReaction ? " disabled-icon-reaction" : ""
                }`}
                src="/assets/smile.png"
                alt=""
              />
            ) : (
              <Smile
                onClick={() => SendReaction(4, movie.id)}
                className={`reaction-icon emoji-icon${
                  loadingReaction ? " disabled-icon-reaction" : ""
                }`}
              >
                <title>Reagir</title>
              </Smile>
            )}
          </div>

          {/* Angry */}
          <div className="div-count-reaction">
            <p className="count-reaction">
              {" "}
              {countReactionsByType(getReactionsOfSomeMovie(movie.id), 5)}
            </p>
            {userReactionType === 5 ? (
              <img
                title="Remover Reação"
                onClick={() => SendReaction(5, movie.id)}
                className={`img-reaction-icon${
                  loadingReaction ? " disabled-icon-reaction" : ""
                }`}
                src="/assets/angry.png"
                alt=""
              />
            ) : (
              <Angry
                onClick={() => SendReaction(5, movie.id)}
                className={`reaction-icon emoji-icon-angry${
                  loadingReaction ? " disabled-icon-reaction" : ""
                }`}
              >
                <title>Reagir</title>
              </Angry>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reactions;
