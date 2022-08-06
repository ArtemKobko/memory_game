import React, { useEffect, useState} from 'react';
import cardsPairs from './Images';
import question from '../images/question.png'

function Cards(){
   const [cardsArr, setCardsArr]=useState([]);
   const [opened, setOpened]=useState([]);
   const [pairs, setPairs]=useState([]);
   const [steps, setSteps]=useState(0);
   
   const swap=(arr)=>{
     let index=arr.length;
     let randomIndex;
     let value;
     while(index!==0){
       randomIndex=Math.floor(Math.random()*index);
       index--;
       value=arr[index];
       arr[index]=arr[randomIndex];
       arr[randomIndex]=value;
     }
     return arr
   }

   useEffect(()=>{
     setCardsArr(swap(cardsPairs));
   },[])
   
   const flipCard=(index)=>{
     setOpened(open=>[...open,index]);
     setSteps(steps=>steps+1)

   }
   
   useEffect(()=>{
      const firstCard=cardsArr[opened[0]];
      const secondCard=cardsArr[opened[1]];
     if(opened<2){
       return
     } 
     if(secondCard && firstCard.type===secondCard.type && firstCard!==secondCard){
       setPairs([...pairs,firstCard.type]);
     }
     if(opened.length===2) {
       setTimeout(()=>setOpened([]),1000)
     }
   },[opened]);
   
   const restartGame=()=>{
     setOpened([]);
     setPairs([]);
     setSteps(0);
     setCardsArr(swap(cardsPairs));
   }

   return(
      <div className="main">
      <p className='steps'>Steps: {steps}</p>
      <div className='cards'>
        {cardsArr.map((item,index)=>{
          let flipped=false;
          if(opened.includes(index)) flipped=true
          if(pairs.includes(item.type)) flipped=true;
          return(
            <div key={index} className={`card ${flipped ? 'flipped':''}`} onClick={()=> flipCard(index)}>
             <div className='inner'>
                     <div className='front'>
                      <img src={item.img} alt="image"/>
                    </div>
                    <div className='back'>
                        <img src={question} alt="question" />
                    </div>
             </div>
            </div>
          )
        })}
    </div>
    <button className='restart' onClick={restartGame}>Restart</button>
    </div>
   )
}
export default Cards;