window.onload = () =>{

    const pickups = document.getElementsByClassName('js--pickup');
    const places = document.getElementsByClassName('js--place')
    const camera = document.getElementById('js--camera');
    let scene = document.getElementById('js--scene');
    // const vlees = document.getElementById("js--vlees");
    // const pepermolen = document.getElementById("js--pepermolen");
    let hold = null;
    var timer;
    


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
    (function(){
        var sec = 0;
        timer = setInterval(()=>{
            sec ++;
            console.log(sec);
        }, 1000) // elke seconde
    })()


    place = (id, object) => {
        let box = document.createElement('a-box');
        let nodeMap = document.getElementById(id).attributes;
        let pos = object.getAttribute('position');
        box.setAttribute('position', {x: pos.x, y:"0.2", z: pos.z});
        box.setAttribute('class', 'js--clickable js--pickup');
        for (let i = 0; i < nodeMap.length; i++){
            if(nodeMap[i].name == "position" || nodeMap[i].name == "class" || nodeMap[i].name == "material" || nodeMap[i].name == "geometry"){
                continue;
            }

            box.setAttribute(nodeMap[i].name, nodeMap[i].value);

        }


        scene.appendChild(box);
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



    // vlees.addEventListener('click', function(evt){
    //  console.log('vlees has been clicked');
    //  if(pepermolen == hold){
    //     vlees.setAttribute("src", vlees_gekruid.jpg)
    // en dan dit elke keer doen voor elke soort kruiden en combinatie? of is dat te ingewikkeld?
    // }
    // })
    


};