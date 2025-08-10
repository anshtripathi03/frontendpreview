import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";

const Card = ({ card }) => {
  const navigate = useNavigate();

  //  const handleCardClick = () => {
  //   navigate(`/card/${card._id}`);
  //   setTimeout(() => {
  //     window.scrollTo({ top: 0 });
  //   }, 0);
  // };


  const { addToCart, addedItemId, handleAddToCart, handleBuyNow, handleCardClick } = useContext(CartContext)


  return (
    <div
      onClick={() => {
        handleCardClick(card, navigate)
      }}
      className="bg-white rounded-lg hover:shadow-[8px_8px_10px_#D98324] border-solid border-[1vw] md:border-[.35vw] border-[#efba4f] transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer md:h-[20vw] h-[60vw] w-full max-w-[280px]"
    >
      <div className=" h-[63%] w-full mb-0">
        <img
          src={card.images.front}
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" h-[30%] w-full">
        <div className="md:px-2 md:py-2 p-[2px] flex-1 flex flex-col  justify-between">
          <div>
            <h3 className="text-sm md:text-xl font-semibold font-serif text-gray-800 line-clamp-1">
              {card.title}
            </h3>
          </div>
          <div>
            <p className="text-[#c28800] text-[4.3vw] md:text-base md:mb-1 font-semibold">₹{card.price}</p>
            <div className="flex md:gap-2 gap-[2.8px] justify-center items-center">
              <button
                onClick={(e) => handleAddToCart(card, e)}
                className={`${addedItemId === card._id ? `bg-green-800` : `bg-yellow-400`
                  } hover:bg-yellow-500 mb-4 md:h-[43px] md:w-[135px] h-[30px] w-[65px] text-white px-2 py-1 rounded text-[9px] md:text-[1.3vw] font-medium`}
              >
                {addedItemId === card._id ? "Added" : "Add to Cart"}
              </button>
              <button
                onClick={(e) => handleBuyNow(card, e, navigate)}
                className="mb-4 md:h-[43px] md:w-[135px] h-[30px] w-[65px] bg-orange-500 hover:bg-orange-600 text-white  rounded text-[9px] md:text-[1.3vw] font-medium">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Card;
