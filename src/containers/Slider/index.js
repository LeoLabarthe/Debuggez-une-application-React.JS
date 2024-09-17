import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Sort the events by date
  const byDateAsc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    setIndex((prevIndex) =>
      prevIndex < byDateAsc.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Slide changes every 5 seconds
  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer); // Clean the timer
  }, [index, byDateAsc.length]);

  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event) => (
        <div
          key={event.id} // Use id as a key
          className={`SlideCard SlideCard--${
            index === byDateAsc.indexOf(event) ? "display" : "hide"
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
      ))}

      {}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc.map((event) => (
            <input
              key={event.id}
              type="radio"
              name="radio-button"
              checked={index === byDateAsc.indexOf(event)}
              onChange={() => setIndex(byDateAsc.indexOf(event))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
