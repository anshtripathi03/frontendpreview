import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";
import dummyCards from "../Data.jsx";

const TrendingCards = () => {
  const [popularCards, setPopularCards] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchPopularCards = () => {
      try {
        const result = dummyCards.filter((card) => card.isPopular === true);
        setPopularCards(result);
      } catch (err) {
        console.log("Failed to fetch popular cards", err);
      }
    };

    fetchPopularCards();

    // Detect mobile
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const responsive = {
  //   desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  //   tablet: { breakpoint: { max: 1024, min: 768 }, items: 4 },
  //   mobile: { breakpoint: { max: 768, min: 0 }, items: 4 },
  // };

  const alwaysFour = {
  all: { breakpoint: { max: 4000, min: 0 }, items: 4 }
};

  return (
    <div className=" bg-[#f4f0d4] py-6 md:py-16 text-heading font-serif">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#6A4E3A]">
        🔥Trending Cards
      </h2>

<div className="bg-[#f6e37a] p-3 w-[93.5vw] md:w-full border-solid border-[.5vw] border-[#E1AA36] rounded-xl">
      {isMobile ? (
        <div className="grid grid-cols-2 gap-4">
          {popularCards.map((card) => (
            <Card key={card._id} card={card} />
          ))}
        </div>
      ) : (
        <Carousel responsive={alwaysFour} infinite autoPlay={false}>
          {popularCards.map((card) => (
            <div key={card._id} className="px-10">
              <Card card={card} />
            </div>
          ))}
        </Carousel>
      )}
      </div>
    </div>
  );
};

export default TrendingCards;
