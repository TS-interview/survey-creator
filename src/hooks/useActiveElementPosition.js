import { useEffect, useLayoutEffect } from 'react';

const useActiveElementPosition = (ref, setPosition) => {
  useEffect(() => {
    const updatePosition = () => {
      setPosition(ref.current.getBoundingClientRect().top);
    };
    window.addEventListener('resize', updatePosition);
    updatePosition();
    return () => window.removeEventListener('resize', updatePosition);
  }, [ref, setPosition]);
};

export default useActiveElementPosition;
