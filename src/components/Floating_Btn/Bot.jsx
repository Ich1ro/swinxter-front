import React, { useState, useRef, useEffect } from "react";
import { Container, Button, lightColors } from "react-floating-action-button";
import { TbMessageChatbot } from "react-icons/tb";
import { Chatbot } from "../Bot/Chatbot";

const BotMessage = () => {
  const [show, setShow] = useState(false);
  const containerRef = useRef(null);

  const handleClick = () => {
    setShow((prevShow) => !prevShow);
  };

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Container fluid>
        {show ? (
          <Chatbot />
        ) : (
          <Button
            tooltip="Click to chat with Chatbot"
            className="msg-green"
            styles={{ color: lightColors.white }}
            onClick={handleClick}
          >
            <TbMessageChatbot style={{fontSize:"40px"}} />
          </Button>
        )}
      </Container>
    </div>
  );
};

export default BotMessage;
