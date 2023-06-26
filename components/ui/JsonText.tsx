import React, { MouseEventHandler } from 'react';
import { JsonTextProps } from '@/types';

const JsonText = ({ index, keyText, value, handleJsonClick }: JsonTextProps) => {
  const handleClick: MouseEventHandler<HTMLDivElement> | undefined = handleJsonClick
    ? () => handleJsonClick({ [keyText]: value })
    : undefined;

  return (
    <div className='hover:bg-[#1e1e1e] duration-100 p-1' onClick={handleClick}>
      <p key={index || null} className="text-gray-300 font-light whitespace-wrap">
        <span className="text-lightBlue whitespace-wrap">"{keyText}"</span>: "{value}"
      </p>
    </div>
  );
};

export default JsonText;
