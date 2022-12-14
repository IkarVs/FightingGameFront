const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); // for context

canvas.width =  1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height);

const gravity= 0.7 ;
const background=new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc:'./img/background.png'
})


const shop=new Sprite({
    position:{
        x:600,
        y:128
    },
    imageSrc:'./img/shop.png',
    scale:2.75,
    framesMax:6,
    framesHold:5
})


const lateralMouvementSpeed = 5;
const player = new Fighter({
    position:{
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:10
    },
    offset:{
        x:0,
        y:0
    }
});
const enemy = new Fighter({
    position:{
        x:400,
        y:100
    },
    velocity:{
        x:0,
        y:0
    },
    offset:{
        x:-50,
        y:0
    },
    color:'blue'
});
const keys ={
    q:{
        pressed:false
    },
    d:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    }


}
function animate(){

    window.requestAnimationFrame(animate);
    c.fillStyle='black';
    c.fillRect(0,0,canvas.width,canvas.height);
    background.update();
    shop.update();
    player.update();
    enemy.update();
    player.velocity.x = 0;
    // player mouvement
    if(keys.q.pressed  &&  player.lastKey==='q'){
        player.velocity.x = - lateralMouvementSpeed
    }else if (keys.d.pressed && player.lastKey==='d'){
        player.velocity.x = lateralMouvementSpeed
    }
    // enemy mouvement
    enemy.velocity.x = 0;
    if(keys.ArrowLeft.pressed  &&  enemy.lastKey==='ArrowLeft'){
        enemy.velocity.x =- lateralMouvementSpeed
    }else if (keys.ArrowRight.pressed && enemy.lastKey==='ArrowRight'){
        enemy.velocity.x = lateralMouvementSpeed
    }

    // DETECT COLLISION
    if(rectangularCollision({rectangle1:player, rectangle2:enemy})){
        player.isAttacking=false;
        console.log("toucheV1")
        enemy.health-=20
        document.querySelector('#enemyHealth').style.width=enemy.health +"%"
    }
    if(rectangularCollision({rectangle1:enemy, rectangle2:player})){
        enemy.isAttacking=false;
        console.log("toucheV2")
        player.health-=20
        document.querySelector('#playerHealth').style.width=player.health +"%"
    }
    //  end the game base on health
    if(player.health<=0||enemy.health<=0){


        determineWinner({player, enemy,timerID})
    }
}
animate();

window.addEventListener('keydown',(event) => {
switch(event.key) {
    case 'd':
        keys.d.pressed=true;
        player.lastKey='d'
        break
    case 'q':
        keys.q.pressed=true;
        player.lastKey='q'
        break
    case 'z':
        player.velocity.y =-20
        break;
    case ' ' :
        player.attack();
        break;

        
    case 'ArrowRight':
        keys.ArrowRight.pressed=true;
        enemy.lastKey='ArrowRight'
        break
    case 'ArrowLeft':
        keys.ArrowLeft.pressed=true;
        enemy.lastKey='ArrowLeft'
        break
    case 'ArrowUp':
        enemy.velocity.y =-20
        break;      
    case 'ArrowDown' :
        enemy.attack();
        break;
}
    console.log(event.key);

})

window.addEventListener('keyup',(event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed=false;
            break
        case 'q' : 
            keys.q.pressed=false;
            break       
        case 'ArrowRight':
            keys.ArrowRight.pressed=false;
            break
        case 'ArrowLeft' : 
            keys.ArrowLeft.pressed=false;
            break       
    }
    })