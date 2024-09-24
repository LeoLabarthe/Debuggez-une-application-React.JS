import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) =>
      new Date(evtB.date) - new Date(evtA.date)
  );
  

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer);
  }, [index, byDateDesc]);

  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <React.Fragment key={`slider-${idx}`.toString()}>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {}
              {byDateDesc.map((eventItem, radioIdx) => (
                <input
                  key={`${eventItem.date}`}
                  type="radio"
                  name={`radio-button-${radioIdx}`}
                  checked={index === radioIdx}
                  onChange={() => handleRadioChange(radioIdx)}
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
