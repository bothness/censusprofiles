import{b as r}from"./paths-6cd3a76e.js";import{g as n}from"./utils-1b3680be.js";async function c({fetch:o}){let e=await n(`${r}/data/csv/places.csv`,o);e.sort((a,s)=>a.areanm.localeCompare(s.areanm));let t={};e.forEach(a=>t[a.areacd]=a);let l=await(await o(`${r}/data/json/K04000001.json`)).json();return{places:e,lookup:t,ew:l}}const u=Object.freeze(Object.defineProperty({__proto__:null,load:c},Symbol.toStringTag,{value:"Module"}));export{u as _,c as l};