import { useEffect, useRef } from "react";
import jazzicon from 'jazzicon-ts';

// @ts-ignore 
export default function Identicon({address, size, ...rest}) {
  const ref =useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(jazzicon(64, parseInt(address.slice(2, 10), 16)));
    }
  }, [address, size]);

  return (
    <div {...rest} >
        <div ref={ref} style={{width:`${size}px`,height:`${size}px`}}  />
    </div>
  )
}