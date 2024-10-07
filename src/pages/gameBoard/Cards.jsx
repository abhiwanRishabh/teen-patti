/* eslint-disable react/prop-types */
import anime from "animejs";
import cardBack from "../../assets/tokens/cardBack.webp";
import Card from "./Card";
import { useCallback, useEffect } from "react";

const EmptyCard = () => {
  return (
    <div className=" z-30 " >
      <Card cardImage={cardBack} />
      <Card cardImage={cardBack} />
      <Card cardImage={cardBack} />
    </div>
  );
};

const ShowHand = ({ hand, playerId }) => {

  useEffect(() => {

    // anime({
    //   targets: ".flip:nth-child(1)",
    //   translateY: [30, 0],
    //   translateX: [30, 0],
    //   // opacity: [0, 1],
    //   delay:  200, // Stagger the animation
    //   easing: 'easeOutQuad',
    //   duration: 400,
    //   easing: 'linear'
    // });
    // anime({
    //   targets: ".flip:nth-child(2)",
    //   rotateY: 360,
    //   duration: 500,
    //   // easing: 'easeInOutQuad'
    //   easing: 'linear'
    // });
    // anime({
    //   targets: ".flip:nth-child(3)",
    //   rotateY: 360,
    //   duration: 500,
    //   // easing: 'easeInOutQuad'
    //   // rotate: '12deg',
    //   easing: 'linear'
    // });

    // ---------

    anime({
      targets: `.flip${playerId}:nth-child(1)`,
      keyframes: [
        {
          rotateY: 180,
        },
        {
          rotateY: 0,
        },
      ],
      duration: 500,
      // easing: 'easeInOutQuad'
      // rotate: '-12deg',
      easing: 'linear'
    });
    anime({
      targets: `.flip${playerId}:nth-child(2)`,
      keyframes: [
        {
          rotateY: 180,
        },
        {
          rotateY: 0,
        },
      ],
      duration: 500,
      // easing: 'easeInOutQuad'
      easing: 'linear'
    });
    anime({
      targets: `.flip${playerId}:nth-child(3)`,
      rotateY: [180, 0],
      duration: 500,
      zindex: 25,
      easing: 'linear'
    });
  }, [])

  return (
    <div className="-mt-7 z-30 " >
      {
        hand.map((e, i) => {
          return <Card key={i} cardImage={`/tokens/${e.name}.png`} className={`flip${playerId}`} />
        })
      }
    </div>
  );
}

function Cards(props) {
  const { seen, hand, playerId} = props.player;
  const {sideShowAccepted} = props;
   
  


  function renderCards() {
    if (seen === false && hand?.length > 0) {
      return <EmptyCard />
    } else if (seen) {
      return (props.isUser || props.isShowDown || sideShowAccepted) ? <ShowHand hand={hand} playerId={playerId} /> : <EmptyCard />
    }
  }
  return <>
    {renderCards()}
  </>;
}
export default Cards;
