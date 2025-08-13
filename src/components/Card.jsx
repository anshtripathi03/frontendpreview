import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";

const Card = ({ card }) => {
  const navigate = useNavigate();

  const { addToCart, addedItemId, handleAddToCart, handleBuyNow, handleCardClick } = useContext(CartContext)

  return (
    <div
      onClick={() => {
        handleCardClick(card, navigate)
      }}
      className="bg-[#eef9f7] rounded-lg hover:shadow-[8px_8px_10px_#A8F1FF] 
      border-[.px] border-solid border-black transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer md:my-3  md:h-[19.5vw] h-[60vw] w-full max-w-[280px]"
    >
      <div className=" h-[55.9%] w-full ">
        <img
          src={card.images.front}
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" h-[30%] px-1 md:px-2 w-full">
        <div className="flex flex-col justify-between">
          {card.discount === 0 ? (
            <>
              {/* Title */}
              <h3 className="text-sm md:text-xl md:px-0 pt-1 md:pt-0 font-semibold font-serif text-gray-800 line-clamp-1">
                {card.title}
              </h3>

              {/* Price */}
              <div className="w-full mb-1 md:mb-0">
                <div className="text-[#183B4E] text-[3.2vw] md:text-[1.23vw] font-sans">
                  Price To Pay:
                </div>
                <div className="text-green-600 font-bold text-[3.2vw] md:text-[1.23vw] font-nata">
                  ₹{card.price}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Title */}
              <h3 className="text-sm md:text-xl md:px-0 pt-1 md:py-1 font-semibold font-serif text-gray-800 line-clamp-1">
                {card.title}
              </h3>

              {/* Real Price + Discount */}
              <div className="w-full flex flex-wrap items-center gap-1 md:mb-1">
                <span className="text-[#183B4E] text-[2vw] md:text-xs font-sans">
                  Real Price:
                </span>
                <span className="text-[#183B4E] text-[2vw] line-through md:text-xs font-nata">
                  ₹{card.price}
                </span>
                <span className="text-[#183B4E] bg-[#ACFADF] px-2 py-0.5 rounded text-[2vw] md:text-xs font-sans">
                  Discount: {card.discount}%
                </span>
              </div>
              <div>
                <span className="text-[#183B4E] text-[3vw] md:text-sm font-sans">
                  Price To Pay:
                </span>
                <span className="text-green-600 font-bold text-[3vw] md:text-sm font-nata">
                  ₹{(card.price - (card.price * card.discount) / 100).toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>



        <div className="flex md:gap-2 gap-[2.8px] justify-center items-center">
          <button
            onClick={(e) => handleAddToCart(card, e)}
            className={`${addedItemId === card._id ? `bg-green-800` : `bg-[#ecfbe8]`
              } hover:bg-[#A2FF86] mb-4 md:h-[43px] md:w-[135px] h-[30px] w-[65px] text-black px-2 rounded-3xl text-[9px] md:text-[1.3vw] font-medium`}
          >
            {addedItemId === card._id ? "Added" : "Add to Cart"}
          </button>
          <button
            onClick={(e) => handleBuyNow(card, e, navigate)}
            className="mb-4 md:h-[43px] md:w-[135px] h-[30px] w-[65px] bg-[#A8F1FF] hover:bg-[#6FE6FC] text-black  rounded-3xl text-[9px] md:text-[1.3vw] font-medium">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
