import * as React from "react";

function AncestorDimensions({ ancestor, renderProps, children }) {
  const [dimensions, setDimensions] = React.useState(null);
  const ancestorRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (ancestorRef.current == null) {
      ancestorRef.current = document.querySelector(ancestor);
    }
    setDimensions({
      width: `${ancestorRef.current.clientWidth}px`,
      height: `${ancestorRef.current.clientHeight}px`,
    });
  }, []);

  return dimensions
    ? children
      ? React.cloneElement(children, { ...dimensions })
      : renderProps(dimensions)
    : null;
}

export { AncestorDimensions };
