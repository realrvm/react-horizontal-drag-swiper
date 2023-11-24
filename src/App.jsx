import React, { useCallback, useRef, useState, useEffect } from "react";

const useSwipe = (ref) => {
  const startX = useRef(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const handleDown = useCallback((e) => {
    setMouseDown(true);
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
      if (mouseDown) {
        ref.current.scrollLeft = startScrollLeft - moveX;
      }
    },
    [mouseDown, startScrollLeft, startX],
  );

  const handleUp = () => {
    setMouseDown(false);
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
};

const Swiper = () => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  useSwipe(ref);
  useSwipe(ref2);

  return (
    <header>
      <ul ref={ref}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
        <li>Item 6</li>
        <li>Item 7</li>
        <li>Item 8</li>
      </ul>
      <ul ref={ref2}>
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
          display: none;
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
