import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const PopUp = (props) => {
  return (
    <Popup
      open={props.open}
      onClose={() => props.setOpen(false)}
      closeOnDocumentClick
      position="center center"
    >
      <div
        style={{
          padding: "1.5rem",
          textAlign: "center",
          fontSize: "1.25rem",
        }}
      >
        {props.text}
      </div>
    </Popup>
  );
};

export default PopUp;
