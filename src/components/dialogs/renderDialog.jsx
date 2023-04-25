import * as React from "react";
import * as ReactClient from "react-dom/client";

function renderDialog(Dialog) {
  if (document.getElementById("dialog-render")) {
    return;
  }

  const container = document.createElement("article");
  container.setAttribute("id", "dialog-render");
  document.getElementsByTagName("body")[0].appendChild(container);
  setTimeout(() => {
    ReactClient.createRoot(document.getElementById("dialog-render")).render(
      <React.StrictMode>
        {React.cloneElement(Dialog(), {
          onClose: (confirmed) => {
            Dialog().props.onClose(confirmed);
            setTimeout(() => {
              document.getElementById("dialog-render").remove();
            }, 0);
          },
        })}
      </React.StrictMode>
    );
  }, 1);
}

export { renderDialog };
