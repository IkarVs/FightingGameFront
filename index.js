const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); // for context

canvas.width =  2000;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height);

const gravity= 0.2 ;
const lateralMouvementSpeed = 5;

class Sprite{

    constructor({position,velocity}) {
        this.position =  position;
        this.velocity = velocity;
        this.height =150;
        this.lastKey 
    }
    draw(){
        c.fillStyle='red'
        c.fillRect(this.position.x,this.position.y,50,150)
    }
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y+=this.velocity.y;
        if(this.position.y + this.height + this.velocity.y >=canvas.height){
            this.velocity.y = 0
        } else this.velocity.y += gravity;
    }
}

const player = new Sprite({
    position:{
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:10
    }
});
const enemy = new Sprite({
    position:{
        x:400,
        y:100
    },
    velocity:{
        x:0,
        y:0
    }
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
        player.velocity.y =-10
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
        enemy.velocity.y =-10
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