import * as React from "react";

const Svg = React.forwardRef(
  ({ className, size = "100%", color = "black", children, ...props }, ref) => {
    const { current: path } = React.useRef(
      React.Children.count(children) >= 1 &&
        children.type &&
        children.type().props.children,
    );
    let myRef;
    const cbref = (element) => {
      ref && ref(element);
      myRef = element;
      const box = myRef?.getBBox();
      myRef?.setAttribute(
        "viewBox",
        [
          Math.round(box.x),
          Math.round(box.y),
          Math.round(box.width),
          Math.round(box.height),
        ].join(" "),
      );
    };

    return (
      <svg
        className={className}
        ref={cbref}
        width={size}
        height={size}
        fill={color}
        {...props}
      >
        {path}
      </svg>
    );
  },
);

export { Svg };
