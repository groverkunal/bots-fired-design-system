import {useEffect,useState} from 'react';
// Start with the same value on server and client, then synchronize and subscribe.
// This avoids hydration attribute mismatches and reacts to preference changes.
export function useReducedMotionPreference(){
  const [reduced,setReduced]=useState(false);
  useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduced(media.matches);sync();media.addEventListener('change',sync);return()=>media.removeEventListener('change',sync)},[]);
  return reduced;
}
