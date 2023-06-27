"use client";
import React, { MouseEventHandler, useState } from 'react';
import { JsonTextProps } from '@/types';

const JsonText = ({ index, keyText, value, handleJsonClick }: JsonTextProps) => {
  const [clicked,setClicked] = useState<boolean>(false);

  return (
    <div className={`hover:bg-[#1e1e1e] ${clicked ? "bg-[#1e1e1e]":"cursor-pointer"} duration-100 p-1`} onClick={handleJsonClick ? ()=>{handleJsonClick({ [keyText]: value })
      setClicked(true);
      setTimeout(()=>{
        setClicked(false);
      },1200);
    }:undefined}>
      <p key={index || null} className={`text-gray-300 ${clicked && "text-gray-500"} font-light whitespace-wrap`}>
        <span className={`text-lightBlue whitespace-wrap ${clicked && "text-gray-500"}`}>"{keyText}"</span>: "{value}"
      </p>
    </div>
  );
};

export default JsonText;
