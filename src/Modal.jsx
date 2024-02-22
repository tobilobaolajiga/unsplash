import { useState, useRef } from 'react';
import axios from 'axios';

export default function Modal({ imgSrc, imgName, imgLocation, getImg }) {
  return (
    <div>
      <div
        className="fixed top-0 left-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center overflow-hidden overscroll-none z-50"
        onClick={getImg}
      >
        <img
          src="public\x.svg"
          alt=""
          width={40}
          height={40}
          className="relative left-[1100px] bottom-[260px] cursor-pointer"
          onClick={getImg}
        />
        <div className="w-3/4 h-1/2 my-[60px] ">
          <img
            src={imgSrc}
            className="rounded-md h-[400px] w-full object-cover"
          />
          <div className="bg-white m-0 px-4 py-2">
            <p className="text-black font-bold">{imgName}</p>
            <p className="text-black">{imgLocation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
