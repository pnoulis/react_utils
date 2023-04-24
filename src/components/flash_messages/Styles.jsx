import styled from "styled-components";

const StyleLayoutFlashMessage = styled.div`
  pointer-events: none;
  padding: 10px 20px;
  min-width: 400px;
  max-width: 600px;
  width: max-content;
  margin: auto;
  border-radius: 6px;
  font-size: 1.2rem;
  letter-spacing: 1px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: white;
  gap: 20px;
  box-shadow: 5px -5px 50px rgba(17, 17, 26, 0.1),
    -5px 5px 50px rgba(17, 17, 26, 0.1);

  background-color: ${({ variant }) => {
    switch (variant) {
      case "info":
        return "green";
      case "success":
        return "blue";
      case "warning":
        return "orange";
      case "error":
        return "red";
      default:
        return "black";
    }
  }};
`;

const StyleLayoutFmItemIcon = styled.section`
  flex: 0 0 50px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyleLayoutFmItemMessage = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyleLayoutFmRoot = styled.div`
  pointer-events: none;
  position: fixed;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 20px;
  width: 100%;
  bottom: 0;
  margin-bottom: 30px;
  justify-items: end;
  padding-right: 70px;
`;

export {
  StyleLayoutFlashMessage,
  StyleLayoutFmItemIcon,
  StyleLayoutFmItemMessage,
  StyleLayoutFmRoot,
};
