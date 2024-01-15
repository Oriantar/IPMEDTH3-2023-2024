window.onload = () =>{

    const pickups = document.getElementsByClassName('js--pickup');
    const places = document.getElementsByClassName('js--place')
    const camera = document.getElementById('js--camera');
    let scene = document.getElementById('js--scene')
    let hold = null;
    var tijd;
    


    addListeners = () => {
        for (let i = 0; i < pickups.length; i++) {
            pickups[i].addEventListener('click', () => {
                if (hold == null) {
                    pickup(event.target.id, camera);
                    event.target.remove();
                }
            })
        }
        for (let i = 0; i < places.length; i++) {
            places[i].addEventListener('click', () => {
                if (hold != null) {
                    place(hold, event.target);
                }
            })
        }
    }
    //timer maken
    function timer(sec){
        tijd = setInterval(()=>{
            var sec = 0;
            sec ++;
            console.log(sec);
        }, 1000) // elke seconde
    }

    function vleesBakken(positie, box){
        if (positie == 0){
            (function(){
                var sec = 0;
                timer = setInterval(()=>{
                    sec ++;
                    console.log(sec);
                    if(sec == 5){
                        box.setAttribute('color', 'brown');
                        active = false;
    
                    }
                    if(sec == 10){
                        box.setAttribute('color', 'black');
                        active = false;
                    }

                }, 1000) // elke seconde
                
            })()
            
        }


    }


    place = (id, object) => {
        let box = document.createElement('a-box');
        let nodeMap = document.getElementById(id).attributes;
        let pos = object.getAttribute('position');
        console.log(pos.z);
        box.setAttribute('position', {x: pos.x, y:"0.2", z: pos.z});
        box.setAttribute('class', 'js--clickable js--pickup');
        for (let i = 0; i < nodeMap.length; i++){
            if(nodeMap[i].name == "position" || nodeMap[i].name == "class" || nodeMap[i].name == "material" || nodeMap[i].name == "geometry"){
                continue;
            }

            box.setAttribute(nodeMap[i].name, nodeMap[i].value);

        }

    
        scene.appendChild(box);
        vleesBakken(pos.z, box); //vlees wordt bruin/zwart na bepaalde tijd als het op de goede locatie geplaatst is.
        document.getElementsByClassName("js--hold").item(0).remove();
        hold = null;
        addListeners();
        
    }
    pickup = (id, camera) => {
            let nodeMap = document.getElementById(id).attributes;
            let text = "";
            for (let i = 0; i < nodeMap.length; i++) {
                if (nodeMap[i].name == "position") continue;
                if (nodeMap[i].name == "material") break;
                if (nodeMap[i].name == "class"){
                    text += nodeMap[i].name + "=" + "'" + nodeMap[i].value + " js--hold' ";
                    continue;
                }
                text += nodeMap[i].name + "=" + "'" + nodeMap[i].value + "' ";
            }
            let hoi = "<a-box " + text + "position='1 -1 -1'></a-box>";
            camera.innerHTML += hoi;
            hold = id;
    }
    addListeners();
};