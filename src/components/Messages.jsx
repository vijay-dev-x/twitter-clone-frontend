import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { PiDotsThreeBold } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineCameraAlt } from "react-icons/md";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesHandler = () => {
    setMessages([...messages, inputMessage]);
    console.log(messages);
    setInputMessage("");
  };

  return (
    <div className=" w-[45%] flex flex-col justify-between p-5">
      <div>
        <div className=" flex w-[100%] items-center justify-between border-b-2 pb-1">
          <div>
            <p className=" text-xl">
              <IoMdArrowBack></IoMdArrowBack>
            </p>
          </div>
          <div className=" flex gap-2 items-center">
            <img
              className=" object-cover rounded-full w-[50px] h-[50px]"
              src="https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg"
              alt="logo"
            />
            <h2 className=" font-semibold text-xl">User</h2>
          </div>
          <div className=" flex  gap-3 text-2xl">
            <p>
              <PiDotsThreeBold></PiDotsThreeBold>
            </p>
            <p>
              <RxCross2></RxCross2>
            </p>
          </div>
        </div>
        {/* messages chart ----- */}
        <div className=" flex justify-end">
          <div className="flex-col h-[75vh] no-scrollbar overflow-y-scroll">
            {messages.map((value, index) => (
              <div
                key={index}
                className=" my-3 flex  w-auto p-2 bg-gray-200 rounded-full justify-between gap-1 items-center"
              >
                <div>
                  <h2 className=" mx-3">{value}</h2>
                </div>
                <div className=" flex gap-1">
                  <img
                    className=" object-cover rounded-full w-[30px] h-[30px]"
                    src="https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg"
                    alt="logo"
                  />
                  {/* <p className=" font-semibold text-l">User</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className=" flex my-3 items-center gap-3">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className=" p-3 rounded-3xl border-2 w-[80%]"
            type="text"
          />

          <p className=" text-3xl cursor-pointer">
            <MdOutlineCameraAlt></MdOutlineCameraAlt>
          </p>
          <button
            onClick={messagesHandler}
            className=" bg-sky-400 rounded-xl p-3 px-5 text-white font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
