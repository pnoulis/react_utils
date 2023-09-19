import * as React from "react";

function AsyncStates({ state, onPending, onResolved, onRejected, children }) {
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
