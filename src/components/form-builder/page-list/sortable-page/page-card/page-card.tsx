import { useState } from 'react';
import { ActionMenu } from './action-menu';

interface Props { title: string; }

export const PageCard = ({ title }: Props) => {
  // const [isHover, setHover] = useState(false);

  return (
    <div
      className="relative flex-1 p-2"
      // onMouseEnter={() => setHover(true)}
      // onMouseLeave={() => setHover(false)}
    >
      <h4 className="text-lg text-gray-900">{title}</h4>
      {/*{isHover && (*/}
      {/*  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">*/}
      {/*    <button className="p-1 rounded-full hover:bg-gray-100 transition">+</button>*/}
      {/*    <ActionMenu />*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
}
