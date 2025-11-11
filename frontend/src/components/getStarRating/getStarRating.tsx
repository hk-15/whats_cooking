import { FaStar } from "react-icons/fa6";

export function getStarRating(rating: number) {
  const colors = {
    black: "#000000ff",
    grey: "#aaa4a4ff",
  };
  const stars = Array(5).fill(rating);

  return (
    <div>
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            color={rating > index ? colors.black : colors.grey}
          />
        );
      })}
    </div>
  );
}
