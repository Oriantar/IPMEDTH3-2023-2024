window.onload = () =>{

    const pickups = document.getElementsByClassName('js--pickup');
    const places = document.getElementsByClassName('js--place');
    const camera = document.getElementById('js--camera');
    const flippables = document.getElementsByClassName('js--flippable');
    let scene = document.getElementById('js--scene');
    const kruidbaar = document.getElementsByClassName('js--kruid');
    // const vlees = document.getElementById("js--vlees");
    // const pepermolen = document.getElementById("js--pepermolen");
    let hold = null;
    let hold2 = null;
    var tijd;
    


    addListeners = () => {
        for (let i = 0; i < pickups.length; i++) {
            pickups[i].addEventListener('click', () => {
                if (hold == null) {
                    let id = event.target.id;
                    if (id == "#Vork" || id == "#Spatel" || id == "#Salt" || id == "#Pepper"){
                    pickup(event.target.id, camera);
                    event.target.remove();
                    }
                }
                else if(hold == "#Vork"){
                    pickupfork(event.target.id, camera);
                    event.target.remove();
                }
            })
        }
        for (let i = 0; i < places.length; i++) {
            places[i].addEventListener('click', () => {
                if (hold2 != null){
                    placefork(hold2, event.target);
                }
                else if (hold != null) {
                    place(hold, event.target);
                }
            })
        }
        
        for (let i= 0; i<kruidbaar.length; i++){
            kruidbaar[i].addEventListener('click', () => {
                if (hold == '#Pepper'){
                    vleeskruiden(event.target.id);
                }
                else if
                 (hold == '#Salt'){
                    vleeszouten(event.target.id);
                }
                else{
                    return;
                }
            })

        for(let i=0; i<flippables.length; i++){
            flippables[i].addEventListener('click', () =>{
                if(hold == '#Spatel'){
                    vleesFlippen(event.target.id);
                }
            } )
        }

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

    
    
    function vleesFlippen(id){
        let vlees = document.getElementById(id);
        text = vlees.getAttribute('class');
        console.log(text);
        if(text == 'js--clickable js--pickup js--halfcooked' && id != '#sateSaltPepper' || id != '#satePepperSalt'){
            vlees.setAttribute('rotation', '180 0 0');
            vlees.setAttribute('class','js--clickable js--pickup js--halfCooked js--flipped');
        }
        else{
            return;
        }
    }

    // add a better way to duplicate the "gltf-model template change thing"
    function vleesBakken(positie, box, id, tijd1, tijd2){
        console.log(box.getAttribute('class'));
        if (positie == 0 && box.getAttribute('class') != 'js--clickable js--pickup js--kruid js--hold'){
            (function(){
                var sec = 0;
                let active = false;
                timer = setInterval(()=>{
                        sec ++;
                    console.log(sec);
                    console.log(box.getAttribute('class'));
                    if(box.getAttribute('class') == 'js--clickable js--pickup js--black'){
                        clearInterval(timer);
                    }
                    if(box.getAttribute('class') =='js--clickable js--pickup js--halfCooked js--flipped'){
                        if(active == false){
                            active = true;
                            sec = 0;
                            sec += tijd1;
                        }
                    }
                    if(sec == tijd1){
                        if(box.getAttribute('class') == 'js--clickable js--pickup js--halfCooked js--flipped'){
                            text = id + 'Cooked';
                            box.removeAttribute('gltf-model');
                            box.setAttribute('gltf-model', text);
                            box.setAttribute('class', 'js--clickable js--pickup js--cooked')
                            box.setAttribute('id', text)
                        } else{
                            text = id + 'HalfCooked';
                            console.log(text);
                            box.removeAttribute('gltf-model');
                            box.setAttribute('gltf-model', text);
                            box.setAttribute('class', 'js--clickable js--pickup js--halfCooked');
                            box.setAttribute('id', text)
                        } 
                    }
                    if(sec >= tijd2){
                        text = id + 'Black';
                        box.removeAttribute('gltf-model');
                        box.setAttribute('gltf-model', text);   
                        box.setAttribute('class', 'js--clickable js--pickup js--black');
                        box.setAttribute('id', text)
                        clearInterval(timer);
                    }
                }, 1000) // elke seconde
                
            })()  
        }
    
    }


    function vleeskruiden(id){
        let vlees = document.getElementById(id);
        text = vlees.getAttribute('id');
        if (text == '#steak' || text == '#sate'){
            text = text + 'Pepper'
            vlees.removeAttribute('gltf-model');
            vlees.setAttribute('id', text);
            vlees.setAttribute('gltf-model', text);
            vlees.setAttribute('class', 'js--clickable js--pickup')
            
        }
        else if(text == '#steakSalt' || text == '#sateSalt'){
            text = text + 'Pepper'
            vlees.removeAttribute('gltf-model');
            vlees.setAttribute('id', text);
            vlees.setAttribute('gltf-model', text);
            vlees.setAttribute('class', 'js--clickable js--pickup js--flippable');
        }
        else{
            return;
        }
    }
    
    function vleeszouten(id){
        let vlees = document.getElementById(id);
        text = vlees.getAttribute('id');
        if (text == '#steak' || text == '#sate'){
            text = text + 'Salt'
            vlees.removeAttribute('gltf-model');
            vlees.setAttribute('id', text);
            vlees.setAttribute('gltf-model', text);
            
        }
        else if(text == '#steakPepper' || text == '#satePepper'){
            text = text + 'Salt'
            vlees.removeAttribute('gltf-model');
            vlees.setAttribute('id', text);
            vlees.setAttribute('gltf-model', text);
            vlees.setAttribute('class', 'js--clickable js--pickup js--flippable');
        }
        else{
            return;
        }
    }

    
    
    /*
    function ziltigVlees(box, id, object){
        (function()){
            if(id is rauwvlees){
                if(object == peper){
                    maak nieuwe box aan vleesmetpeper
                }
                if(object == zout)
                    maak nieuwe box aan vleesmetzout
                }
            }
            if(id is vleesmetpeper){
                if(object == salt){
                    maak nieuwe box aan  gekruid
                }
            }
            if(id is vleesmetzout){
                if(object == peper){
                    maak nieuwe box aan gekruid
                }
            }   
        }
    }
    */

  place = (id, object) => {
        let box = document.createElement('a-entity');
        let nodeMap = document.getElementById(id).attributes;
        let pos = object.getAttribute('position');
        console.log(pos.z);
        box.setAttribute('position', {x: pos.x, y:"0.2", z: pos.z});
        console.log(box.getAttribute('position'));
        box.setAttribute('class', 'js--clickable js--pickup');
        for (let i = 0; i < nodeMap.length; i++){
            if(nodeMap[i].name == "position" ||  nodeMap[i].name == "material" || nodeMap[i].name == "geometry"){
                continue;
            }
            box.setAttribute(nodeMap[i].name, nodeMap[i].value);
        }
        scene.appendChild(box);
        // ziltigVlees(pos.z, box, id, object);
        vleesBakken(pos.z, box, id, 5, 10); //vlees wordt bruin/zwart na bepaalde tijd als het op de goede locatie geplaatst is.
        document.getElementsByClassName("js--hold").item(0).remove();
        hold = null;
        addListeners();

    }

    placefork = (id, object) => {
        let box = document.createElement('a-entity');
        let nodeMap = document.getElementById(id).attributes;
        let pos = object.getAttribute('position');
        console.log(pos.z);
        box.setAttribute('position', {x: pos.x, y:"0.2", z: pos.z});
        console.log(box.getAttribute('position'));
        box.setAttribute('class', 'js--clickable js--pickup');
        for (let i = 0; i < nodeMap.length; i++){
            if(nodeMap[i].name == "position" ||  nodeMap[i].name == "material" || nodeMap[i].name == "geometry"){
                continue;
            }
            box.setAttribute(nodeMap[i].name, nodeMap[i].value);
        }
        scene.appendChild(box);
        // ziltigVlees(pos.z, box, id, object);
        vleesBakken(pos.z, box, id, 5, 10); //vlees wordt bruin/zwart na bepaalde tijd als het op de goede locatie geplaatst is.
        document.getElementsByClassName("js--hold").item(0).remove();
        hold2 = null;
        addListeners();

    }

    pickupfork = (id, camera) => {
        let nodeMap = document.getElementById(id).attributes;
        let text = "";
        if (id != "#Spatel" || id != "#Pepper" || id != "#Salt"){
        for (let i = 0; i < nodeMap.length; i++) {
            if (nodeMap[i].name == "position") continue;
            if (nodeMap[i].name == "material") continue;
            if (nodeMap[i].name == "gltf-model") continue;
            if (nodeMap[i].name == "scale") continue;
            if (nodeMap[i].name == "rotation") continue;
            if (nodeMap[i].name == "class"){
                if(nodeMap[i].value != 'js--clickable js--pickup js--kruid js--hold'){
                text += nodeMap[i].name + "=" + "'" + nodeMap[i].value + " js--hold' ";
                continue;
                }
            }
            text += nodeMap[i].name + "=" + "'" + nodeMap[i].value + "' ";
            console.log(text);
        }

        if(id == '#sate' || id == '#satePepper' || id == '#satePepperSalt'
         || id == '#sateSalt' || id == '#sateSaltPepper' ||
          id == '#satePepperSaltCooked' || id == '#sateSaltPepperCooked' ||
           id == '#satePepperSaltHalfCooked' || id == '#sateSaltPepperHalfCooked' ||
            id == '#satePepperSaltBlack' ||id == '#sateSaltPepperBlack')  {
             text += 'scale= "0.3 0.3 0.3"';
            }
        if(id == '#Spatel'){
            text += 'rotation= "0 -95 0 "';
        }
        let hoi = "<a-entity " + text + "position='1 -1 -1'" + " gltf-model='" + id + "'  " + "></a-entity>";
        console.log(hoi);
        camera.innerHTML += hoi;
        hold2 = id;
        for ( let i = 0; i < nodeMap.length; i++){
            if(nodeMap[i].value == 'js--clickable js--pickup js--black' && nodeMap[i].name == "class"){
                console.log("yep")
            }
            
        }
    }
        console.log(hold);
}


    pickup = (id, camera) => {
            let nodeMap = document.getElementById(id).attributes;
            let text = "";
            console.log(id);
            if (id == "#Vork" || id == "#Spatel" || id == "#Salt" || id == "#Pepper"){
            for (let i = 0; i < nodeMap.length; i++) {
                if (nodeMap[i].name == "position") continue;
                if (nodeMap[i].name == "material") continue;
                if (nodeMap[i].name == "gltf-model") continue;
                if (nodeMap[i].name == "scale") continue;
                if (nodeMap[i].name == "rotation") continue;
                if (nodeMap[i].name == "class"){
                    if(nodeMap[i].value != 'js--clickable js--pickup js--kruid js--hold'){
                    text += nodeMap[i].name + "=" + "'" + nodeMap[i].value + " js--hold' ";
                    continue;
                    }
                }
                text += nodeMap[i].name + "=" + "'" + nodeMap[i].value + "' ";
                console.log(text);
            }

            if(id == '#sate' || id == '#satePepper' || id == '#satePepperSalt'
             || id == '#sateSalt' || id == '#sateSaltPepper' ||
              id == '#satePepperSaltCooked' || id == '#sateSaltPepperCooked' ||
               id == '#satePepperSaltHalfCooked' || id == '#sateSaltPepperHalfCooked' ||
                id == '#satePepperSaltBlack' ||id == '#sateSaltPepperBlack')  {
                 text += 'scale= "0.3 0.3 0.3"';
                }
            if(id == '#Spatel'){
                text += 'rotation= "0 -95 0 "';
            }
            let hoi = "<a-entity " + text + "position='1 -1 -1'" + " gltf-model='" + id + "'  " + "></a-entity>";
            console.log(hoi);
            camera.innerHTML += hoi;
            hold = id;
            for ( let i = 0; i < nodeMap.length; i++){
                if(nodeMap[i].value == 'js--clickable js--pickup js--black' && nodeMap[i].name == "class"){
                    console.log("yep")
                }
                
            }
        }
            console.log(hold);
    }
    addListeners();

    

    



    //  <a-asset-item id="steakSalt" src="./assets/steakSalt.gltf"></a-asset-item>
    // <a-asset-item id="steakPepper" src="./assets/steakPepper.gltf"></a-asset-item>



    // vlees.addEventListener('click', function(evt){
    //  console.log('vlees has been clicked');
    //  if(pepermolen == hold){
    //     vlees.setAttribute("src", vlees_gekruid.jpg)
    // en dan dit elke keer doen voor elke soort kruiden en combinatie? of is dat te ingewikkeld?
    // }
    // })
    


};