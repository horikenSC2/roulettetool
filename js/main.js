'use strict';

{
  const inputArea=document.getElementById('inputArea');
  const candidateArea=document.getElementById('candidateArea');
  const startBtn=document.getElementById('start');
  const stopBtn=document.getElementById('stop');
  const mainPanel=document.getElementById('mainPanel');
  const candidatesNode=[];
  let currentNum=0;
  let timeoutId;
  let isRunning=false;
  let isStopping=false;
  let winnerNum;
  
  inputArea.addEventListener('input',()=>{
    if(isRunning){
      return;
    }
    if(isStopping){
      return;
    }
    while(candidateArea.firstChild){
      candidateArea.removeChild(candidateArea.firstChild);
    }
    candidatesNode.splice(0);
    const candidates=document.querySelector('textarea').value.split('\n');
    candidates.forEach(candidate=>{
      if(!candidate){
        return;
      }
      const li=document.createElement('li');
      li.textContent=removeNunber(candidate);
      candidateArea.appendChild(li);
      candidatesNode.push(li);
    });
  });

  startBtn.addEventListener('click',()=>{
    if(isRunning){
      return;
    }
    if(isStopping){
      return;
    }
    start();
  });

  stopBtn.addEventListener('click',()=>{
    if(isRunning===false){
      return;
    }
    if(isStopping){
      return;
    }
    stop();
  });

  function removeNunber(name){
    while(isNaN(name[0])===false){
      name=name.substring(1);
    }
    return name;
  }

  function roulette(){
    candidatesNode.forEach(node=>{
      node.classList.remove('active');
    });
    candidatesNode[currentNum].classList.add('active');
    mainPanel.textContent=candidatesNode[currentNum].textContent
    currentNum++;
    if(currentNum===candidatesNode.length){
      currentNum=0;
    }
    timeoutId=setTimeout(()=>{
      roulette();
    },70);
  }

  function stoppingRoulette(speed){
    speed+=70;
    candidatesNode.forEach(node=>{
      node.classList.remove('active');
    });
    candidatesNode[currentNum].classList.add('active');
    mainPanel.textContent=candidatesNode[currentNum].textContent;
    if(currentNum===winnerNum&&speed>1250){
      winner();
      return;
    }
    currentNum++;
    if(currentNum===candidatesNode.length){
      currentNum=0;
    }
    timeoutId=setTimeout(()=>{
      stoppingRoulette(speed);
    },speed);
  }

  function start(){
    candidatesNode[currentNum].classList.remove('win');
    mainPanel.classList.remove('win');
    currentNum=0;
    isRunning=true;
    roulette();
  }

  function stop(){
    isRunning=false;
    isStopping=true;
    winnerNum=Math.floor(Math.random()*(candidatesNode.length));
    clearTimeout(timeoutId);
    setTimeout(()=>{
      stoppingRoulette(50);
    },50);
  }

  function winner(){
    candidatesNode[currentNum].classList.add('win');
    mainPanel.classList.add('win');
    isStopping=false;
  }
}