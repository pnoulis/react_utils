import * as React from "react";

function AsyncStates({ state, onPending, onResolved, onRejected, children }) {
  React.useEffect(() => {
    console.log("ASYNC STATES STATE CHANGE");
    console.log(state);
  }, [state]);
  switch (state) {
    case "pending":
      return <>{onPending || <p>pending</p>}</>;
    case "resolved":
      return <>{onResolved || <p>resolved</p>}</>;
    case "rejected":
      return <>{onRejected || <p>rejected</p>}</>;
    default:
      return <>{children}</>;
  }
}

export { AsyncStates };
