
import MediaPlayer from "./MediaPlayer.js";

const player = new MediaPlayer();

player.play();   
setTimeout(() => player.pause(), 1500);   
setTimeout(() => player.play(), 3000);    
setTimeout(() => player.stop(), 5000);    
setTimeout(() => {
  player.pause(); 
  player.play();  
}, 6000);
