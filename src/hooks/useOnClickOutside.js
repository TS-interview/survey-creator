import { useEffect } from 'react';

// citation: https://usehooks.com/useOnClickOutside/
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const callBack = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', callBack);
    document.addEventListener('touchstart', callBack);
    return () => {
      document.removeEventListener('mousedown', callBack);
      document.removeEventListener('touchstart', callBack);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
