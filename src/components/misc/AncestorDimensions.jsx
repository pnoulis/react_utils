import * as React from "react";

/*
  _WHAT_
  This component reads the dimensions of a *rendered* UI component
  somewhere along the DOM tree specified by the property ancestor.
  The dimensions are either passed to the first child component
  through React.cloneElement or by utilizing the renderProps pattern.

  _USE CASES_
  1. Allow for a component to fill the entirety of the available space
  only to lock it afterwards so that it may be used as as scrolling
  container.

  _Dimensions Calculations_
  width
  height
  widthPadding -> HTMLElement.clientWidth
  heightPadding -> HTMLElement.clientHeight
  widthMargin
  heightMargin
  widthBorder
  heightBorder
  widthScroll -> HTMLElement.offsetWidth
  heightScroll -> HTMLElement.offsetHeight
 */

function AncestorDimensions({
  ancestor,
  renderProps,
  children
}) {
  const [dimensions, setDimensions] = React.useState(null);
  const ancestorRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (ancestorRef.current == null) {
      ancestorRef.current = document.querySelector(ancestor);
    }
    const computedStyle = window.getComputedStyle(ancestorRef.current);
    const scrollWidth = ancestorRef.current.scrollWidth;
    const scrollHeight = ancestorRef.current.scrollHeight;
    const paddingX = parseFloat(computedStyle.paddingLeft) + parseFloat(
      computedStyle.paddingRight);
    const paddingY = parseFloat(computedStyle.paddingTop) + parseFloat(
      computedStyle.paddingBottom);
    const borderX = parseFloat(computedStyle.borderLeft) + parseFloat(
      computedStyle.borderRight);
    const borderY = parseFloat(computedStyle.borderTop) + parseFloat(
      computedStyle.borderBottom);
    const marginX = parseFloat(computedStyle.marginLeft) + parseFloat(
      computedStyle.marginRight);
    const marginY = parseFloat(computedStyle.marginTop) + parseFloat(
      computedStyle.marginRight);

    setDimensions({
      width: `${scrollWidth - paddingX}px`,
      height: `${scrollHeight - paddingY}px`,
      widthPadding: `${scrollWidth}px`,
      heightPadding: `${scrollHeight}px`,
      widthBorder: `${scrollWidth + borderX}px`,
      heightBorder: `${scrollHeight + borderY}px`,
      widthMargin: `${scrollWidth + borderX + marginX}px`,
      heightMargin: `${scrollHeight + borderY + marginY}px`,
    });
  }, []);

  console.log(dimensions);

  return dimensions ?
    children ?
    React.cloneElement(children, {
      ...dimensions
    }) :
    renderProps(dimensions) :
    null;
}

export {
  AncestorDimensions
};
