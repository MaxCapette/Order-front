// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import sendMessage from "../../store/middlewares/chatApi";
// import { addMessage } from "../../store/reducers/chatSlice";

// function ChatComponent() {
//   const [message, setMessage] = useState("");
//   const dispatch = useDispatch();
//   setMessage("Hello");
//   const handleSendMessage = async () => {
//     await sendMessage(message);
//     dispatch(addMessage(message));
//     setMessage("");
//   };

//   return (
//     <div>
//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button type="button" onClick={handleSendMessage}>
//         Send
//       </button>
//     </div>
//   );
// }

// export default ChatComponent;
