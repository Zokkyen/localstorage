/*
    Faire une gestion des liens d'exposés en utilisant le local storage.

    Pour cela vous devrez faire  une page permettant les fonctionnalités suivantes:

    enregistrer un lien Prezi.
    lister tous les exposés (titres et liens)
    supprimer un lien depuis la liste
*/

//JSON.stringify transform array to string
//JSON.parse transform string to array

/* Init some variables */
let projects = new Array;
let i = 0;
let k = 0;

/* Add values if already existing */
let updateFromLS = () => {
    if(localStorage.getItem(`projects0`) !== null){
        while(localStorage.getItem(`projects${k}`) !== null){
            projects[k] = JSON.parse(localStorage.getItem(`projects${k}`));

            let cloneName = document.getElementById('projectsName');
            cloneName.innerHTML += `<p id="cloneName${i}" class="Pad">${projects[k].projectName}</p>`;
        
            let cloneLink = document.getElementById('projectsLink');   
            cloneLink.innerHTML += `<div id="cloneLink${i}" class="Pad"><a target="_blank" href="${projects[k].projectLink}" rel="stylesheet">${projects[k].projectLink}</a><img src="public/assets/img/trash.png" alt="Trash icon" class="trash"></div>`; 

            k++;
        }
        i = k;
    }
    else {
        console.log("No existing values in Local Storage");
    }
}

updateFromLS();

/* Add new values in the array and stock to localStorage */
btnSaved.addEventListener('click', () => {
    console.log(i)
    projects.push({
        'projectName' : nProject.value, 
        'projectLink' : lProject.value
    })
    localStorage.setItem(`projects${i}`, JSON.stringify(projects[i]));

    let cloneName = document.getElementById('projectsName');
    cloneName.innerHTML += `<p id="cloneName${i}" class="Pad">${JSON.parse(localStorage.getItem(`projects${i}`)).projectName}</p>`;

    let cloneLink = document.getElementById('projectsLink');   
    cloneLink.innerHTML += `<div id="cloneLink${i}" class="Pad"><a target="_blank" href="${JSON.parse(localStorage.getItem(`projects${i}`)).projectLink}" rel="stylesheet">${JSON.parse(localStorage.getItem(`projects${i}`)).projectLink}</a><img src="public/assets/img/trash.png" alt="Trash icon" class="trash"></div>`; 
    i++;
})

/* Remove values in HTML and localStorage */
rstBtn.addEventListener('click', () => {
    for(let j = projects.length-1; j >= 0; j--){
        if((document.getElementById(`cloneName${j}`) != null)&&(document.getElementById(`cloneLink${j}`) != null)){
            document.getElementById(`cloneName${j}`).remove();
            document.getElementById(`cloneLink${j}`).remove();
        }
    }
    localStorage.clear();
    i = 0;
})

/* Add a remove with trash icon for only one project */
window.addEventListener('click', (event) => {
    if(event.path[0].classList[0] == "trash"){
        let rmId = Number(event.path[0].parentNode.id.slice(9));  
        let m = rmId;
        /* Remove in HTML */
        document.getElementById(`cloneName${rmId}`).remove();
        document.getElementById(`cloneLink${rmId}`).remove();
        /* Remove in local storage */
        localStorage.removeItem(`projects${rmId}`);
        /* Remove in the array */
        projects.splice(rmId, 1);


        //console.log(projects)

        /* Shit the next value to always get a suite of number */

        console.log(storage)

        
        while(localStorage.getItem(`projects${rmId+1}`) !== null){
            
            let storage = JSON.parse(localStorage.getItem(`projects${rmId+1}`));
            if(storage != null){
                localStorage.removeItem(`projects${rmId+1}`);
                localStorage.setItem(`projects${rmId}`, JSON.stringify(storage));
                rmId++;
            }
            else{
                localStorage.removeItem(`projects${rmId}`);
            }
        }

        

    }
})
