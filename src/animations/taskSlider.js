
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

CustomEase.create("cubic","0.83,0,0.17,1");
let isAnimating=false;

export function initializeCard(){
    let tasks=Array.from(document.querySelectorAll(".task"));
    console.log(tasks);
    gsap.to(tasks,{
        y:(i)=>-20+20*i,
      
        duration:1,
        ease:"cubic",
        stagger:-0.1,
    });
}