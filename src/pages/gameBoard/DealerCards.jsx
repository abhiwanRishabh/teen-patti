import cardBack from "../../assets/tokens/cardBack.webp";

function DealerCards({ players }) {
  // ** set card z-index
  const handleCardZindex = (cardId) => {
    let idx = cardId % 3;
    let zIndexes = [10, 12, 14];
    return zIndexes[idx];
  }
   
  
  const cards = [];
  players?.map((e) => {
    if (e.isAvailable) {
      cards.push((e.playerId * 3) + 1, (e.playerId * 3) + 2, (e.playerId * 3) + 3)
    }
  })
  
  return (
    <div className="delaer-cards ">
      {cards?.map((card) => (
        <img
          key={`card-id-${card}`}
          src={cardBack}
          alt="cardImage"
          className={`card-id-${card} absolute sm:w-[2rem] md:w-[2.3rem] lg:md:w-[3.4rem] left-[48%] top-[30%]`}
          style={{ zIndex: handleCardZindex(card) }}
        />
      ))}
    </div>
  );
}

export default DealerCards;
