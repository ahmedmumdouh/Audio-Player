let audio=document.getElementById("player") ;
let playBtn=document.getElementById("play") ;
let shuffleBtn = document.getElementById("shuffle");
let repeatBtn =document.getElementById("repeat") ;
let curSong = document.getElementById("curSong") ;
let curState= document.getElementById("curState") ;
let addBtn = document.getElementById("add")
let file = document.getElementById("file") ;

let list= ["canon.mp3","dream.mp3","hero.mp3","mombasa.mp3","swan-lake.mp3"]
let dlist= ["canon.mp3","dream.mp3","hero.mp3","mombasa.mp3","swan-lake.mp3"]
let currentSong = 0 ;


let shuffle =function (){
    currentSong = Math.floor(Math.random() * list.length); 
    audio.src =list[currentSong] ;
    curSong.innerText = dlist[currentSong] ;
    curState.innerText = "Suffle_Mode"
    audio.play() ;
}

playBtn.addEventListener('click',function(){
    audio.play() ;
    curState.innerText = "Play_Mode"
    curSong.innerText = dlist[currentSong] ;
})

shuffleBtn.addEventListener('click' ,function(){
    shuffle() ;
})

repeatBtn.addEventListener('click',function(){
    curState.innerText = "Repeat_Mode"
    curSong.innerText = dlist[currentSong] ;
})


$("#audioApp ul").on('click','a',function(index){
    currentSong = $(this).parent().index() ;
    audio.src=list[currentSong] ;
    curSong.innerText = dlist[currentSong] ;
    curState.innerText = "list_Mode"
    audio.play() ;
})

audio.addEventListener("ended",function(){
    if(curState.innerText == "list_Mode"){
        audio.pause() ;
        curSong.innerText = "None" ;
    }
    else if(curState.innerText == "Repeat_Mode"){
        audio.src = list[currentSong]
        audio.play()
    }
    else if(curState.innerText == "Suffle_Mode"){
        shuffle() ;
    }
    else if(curState.innerText == "Play_Mode"){

        if(currentSong < list.length -1  ){
            currentSong++ ;
        }
        else{
            currentSong = 0
        }
        audio.src = list[currentSong]
        curSong.innerText = dlist[currentSong] ;
        audio.play()
    }
    else{
        curSong.innerText = "None" ;
        curState.innerText = "None" ;
    }

})


// addBtn.addEventListener('click',function(){
//     let fname=file.value.match(/\w+(_|-| )*\w*.mp3$/gi) ;
//     if( fname != null){
//         let file = URL.createObjectURL(file.value)
//         list.push(file)
//         $('#audioApp ul').append(`<li><a id="${list.length -1}">${fname}      </a><button>Del</button></li>`)
//         file.value="" 
//     }
    
//     console.log(file.value)
// })

file.onchange = function() {
    let files = this.files;
    // alert(files);
    // alert("files")
    if( files[0]["name"] != null){
        let fiile = URL.createObjectURL(files[0]);
        console.log(files[0]["name"])
        list.push(fiile)
        dlist.push(files[0]["name"])
        $('#audioApp ul').append(`<li><a id="${list.length -1}">${files[0]["name"]}      </a><button>Del</button></li>`)
        file.value="" 
    }
    
  };

$('#audioList').on('click','button',function(index){
    let sIndex= $(this).parent().index() ;
    list.splice( sIndex, 1)
    dlist.splice(sIndex, 1)
    $(this).parent().remove()
    if( currentSong == sIndex && list.length >1){
        audio.pause();
        currentSong = 0
        audio.src = list[currentSong]
        curSong.innerText=dlist[currentSong]
    }
    else if(currentSong == sIndex && list.length < 1){
        audio.pause();
        currentSong = 0
        audio.src = ""
        curSong.innerText = "None" ;
        curState.innerText = "None" ;
    }
    
})

curSong.innerText = "None" ;
curState.innerText = "None" ;
