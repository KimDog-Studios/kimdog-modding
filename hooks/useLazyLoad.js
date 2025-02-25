import { useEffect, useRef, useState } from 'react';

const useLazyLoad = (options) => {
  const [elements, setElements] = useState([]);
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyElement = entry.target;
          lazyElement.src = lazyElement.dataset.src;
          observer.current.unobserve(lazyElement);
        }
      });
    }, options);

    const currentObserver = observer.current;

    elements.forEach((element) => {
      if (element) currentObserver.observe(element);
    });

    return () => currentObserver.disconnect();
  }, [elements, options]);

  return [setElements];
};

export default useLazyLoad;