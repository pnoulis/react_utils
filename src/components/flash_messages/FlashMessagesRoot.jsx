import * as React from "react";

function FlashMessagesRoot({ FlashMessages, rootRef, children }) {
  const [flashMessages, setFlashMessages] = React.useState([]);
  const fmsRef = React.useRef([]);

  React.useEffect(() => {
    FlashMessages.mountPoint = rootRef.current;
    FlashMessages.setFm = (fm) => setFlashMessages((prev) => [...prev, fm]);
  }, []);

  React.useEffect(() => {
    for (let i = 0; i < rootRef.current.children.length; i++) {
      fmsRef.current[i] = rootRef.current.children[i];
    }

    let event = null;
    if (flashMessages.length > 0) {
      event = window.setInterval(() => {
        const now = Date.now();
        setFlashMessages(
          flashMessages.reduce((car, cdr, i) => {
            if (now > cdr.timeout) {
              fmsRef.current[i].remove();
            } else {
              car.push(cdr);
            }
            return car;
          }, [])
        );
      }, 1000);
    } else {
      event && window.clearInterval(event);
    }

    return () => event && window.clearInterval(event);
  }, [flashMessages, setFlashMessages]);

  return <>{children}</>;
}

export { FlashMessagesRoot };
