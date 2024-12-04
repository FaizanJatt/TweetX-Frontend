import React, { useState } from "react";

type ModalProps = {
  onClose: () => void;
  postHandler: (content: string) => void;
};

const Modal: React.FC<ModalProps> = ({ onClose, postHandler }) => {
  const [text, setText] = useState("");
  const maxCharacters = 100;

  const characterCount = text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= maxCharacters) {
      setText(inputText);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80 animate-slide-down"
        style={{
          animation: "slide-down 0.3s ease-out forwards",
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Write a Post</h2>
        <textarea
          value={text}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Write your message here..."
        ></textarea>
        <div className="text-right mt-2 text-sm">
          <span
            className={
              characterCount >= maxCharacters ? "text-red-500" : "text-gray-500"
            }
          >
            {characterCount}/{maxCharacters} characters
          </span>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded-md text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle the post submission logic here
              postHandler(text);
              onClose();
            }}
            disabled={characterCount === 0}
            className={`px-4 py-2 text-sm rounded-md text-white ${
              characterCount >= maxCharacters ? "bg-gray-400" : "bg-blue-500"
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
