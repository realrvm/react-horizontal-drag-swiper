import React, { useCallback, useRef, useState, useEffect } from "react";

const Swiper = () => {
  const ref = useRef(null);
  const startX = useRef(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [myMouseDown, setMyMouseDown] = useState(false);

  const handleDown = useCallback((e) => {
    setMyMouseDown(true);
    if (!ref.current.contains(e.target)) return;
    startX.current = e.pageX - ref.current.offsetLeft;
    setStartScrollLeft(ref.current.scrollLeft);
  }, []);

  const handleMove = useCallback(
    (e) => {
      e.preventDefault();
      if (!ref.current.contains(e.target)) return;
      const mouseX = e.pageX - ref.current.offsetLeft;
      const moveX = mouseX - startX.current;
      if (myMouseDown) {
        ref.current.scrollLeft = startScrollLeft - moveX;
      }
    },
    [myMouseDown, startScrollLeft, startX],
  );

  const handleUp = () => {
    setMyMouseDown(false);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mousemove", handleMove);
    return () => {
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mousemove", handleMove);
    };
  }, [handleDown, handleMove]);

  const handleScroll = (e) => {
    const { scrollWidth, scrollLeft, clientWidth } = e.target;
    if (scrollLeft + clientWidth === scrollWidth) console.log("end");
    if (scrollLeft === 0) console.log("start");
  };

  return (
    <header className="container">
      {startX.current} - {startScrollLeft} - {JSON.stringify(myMouseDown)}
      <ul onScroll={handleScroll} ref={ref}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
        <li>Item 6</li>
        <li>Item 7</li>
        <li>Item 8</li>
      </ul>
      <style jsx>{`
        ul {
          overflow-x: auto;
          overflow-y: hidden;
          white-space: nowrap;
          height: 260px;
          cursor: grab;
          padding: 0;
          display: grid;
          grid-gap: 20px;
          grid-template-columns: repeat(8, 260px);
        }
        ul::-webkit-scrollbar {
          background: #ebeced;
          height: 6px;
          margin: 0 20px;
        }
        ul::-webkit-scrollbar-thumb {
          background: #c8cad0;
        }
        li {
          display: inline-block;
          vertical-align: top;
          width: 230px;
          height: 230px;
          white-space: normal;
          background: grey;
        }
      `}</style>
    </header>
  );
};

export default function App() {
  return <Swiper />;
}
