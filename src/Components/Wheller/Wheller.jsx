import React, { useEffect, useRef } from 'react';
import "./Wheller.css";

const Wheller = () => {
  const degree = 1800;
  const clicks = useRef(0);
  const wheelRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const setPosition = () => {
      sectionsRef.current = Array.from(document.querySelectorAll('.sec')).map(section => ({
        element: section,
        position: section.getBoundingClientRect().top,
        name: section.getAttribute('data-name')
      }));
    };

    const getCounterData = () => {
      setPosition();
      const positions = sectionsRef.current.map(section => section.position);
      const sortedPositions = [...positions].sort((a, b) => a - b);
      const closest = sortedPositions[1];
      const index = positions.indexOf(closest);
      const name = sectionsRef.current[index].name;
      alert(name);
    };

    const handleSpinClick = () => {
      clicks.current++;
      const newDegree = degree * clicks.current;
      const extraDegree = Math.floor(Math.random() * 360) + 1;
      const totalDegree = newDegree + extraDegree;

      wheelRef.current.style.transform = `rotate(${totalDegree}deg)`;

      setTimeout(getCounterData, 7000); 
    };

    const spinElement = document.getElementById('spin');
    if (spinElement) {
      spinElement.addEventListener('click', handleSpinClick);
    }

    setPosition();

    return () => {
      if (spinElement) {
        spinElement.removeEventListener('click', handleSpinClick);
      }
    };
  }, []);

  return (
    <div id="wrapper">
      <div id="wheel">
        <div id="inner-wheel" ref={wheelRef}>
          <div className="sec" data-name="1X"><span className="fa fa-bell-o">1X</span></div>
          <div className="sec" data-name="2X"><span className="fa fa-comment-o">2X</span></div>
          <div className="sec" data-name="0X"><span className="fa fa-smile-o">0X</span></div>
          <div className="sec" data-name="3X"><span className="fa fa-heart-o">3X</span></div>
          <div className="sec" data-name="0.5X"><span className="fa fa-star-o">0.5X</span></div>
          <div className="sec" data-name="10X"><span className="fa fa-lightbulb-o">10X</span></div>
        </div>
        <div id="spin">
          <div id="inner-spin"></div>
        </div>
        <div id="shine"></div>
      </div>
    </div>
  );
};

export default Wheller;
