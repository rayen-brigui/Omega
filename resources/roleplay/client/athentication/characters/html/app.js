alt.on('showpage',()=>{
    document.getElementById('charBody').style="display:contents;"
})


document.getElementById('createcharacter').onclick = () => {
    document.getElementById('characterselector').style = "display:none;"
    document.getElementById('createcharecterscreen').style = "display:flex;"
 }
 document.getElementById('createCharacter').onclick = () => {
     let CharName = document.getElementById('name').value
     let CharSurname = document.getElementById('surname').value
     let date = document.getElementById('date').value
     let MomName = document.getElementById('MomName').value
     let FatherName = document.getElementById('FatherName').value
     let sex = document.getElementById('sex').value

     alt.emit('NewCharacter',CharName,CharSurname,date,MomName,FatherName,sex)
    //  alt.emit('newCharacterInfo')
    document.getElementById('name').value = ""
    document.getElementById('surname').value = ""
    document.getElementById('date').value = ""
    document.getElementById('MomName').value = ""
    document.getElementById('FatherName').value = ""
    document.getElementById('characterselector').style = "display:flex;"
    document.getElementById('createcharecterscreen').style = "display:none;"
    alt.emit('showcharData');
 }
 document.getElementById('lastpage').onclick = () => {
   document.getElementById('characterselector').style = "display:flex;"
    document.getElementById('createcharecterscreen').style = "display:none;"
 }
 alt.on('CharacterInfo',(character) => {
     document.getElementById('charBody').style = "display:block;"
    for(let i = 0; i <= 1;i++) {
        if(character[i] == undefined) {
            document.getElementById(i).innerHTML = `
            <ul>
            <li>Id.Num: </li>
            <li>Name: </li>
            <li>Surname: </li>
            <li>Sex: </li>
            <li>Bank Balance: </li>
            <li>Cash: </li>
            <button>Empty Slot</button>
            </ul>
        `
        }else {
            document.getElementById(i).innerHTML = `
                <ul>
                <li>Id.Num: ${character[i].id}</li>
                <li>Name: ${character[i].name}</li>
                <li>Surname: ${character[i].surname}</li>
                <li>Sex: ${character[i].sex}</li>
                <li>Bank Balance: ${character[i].bankmoney}</li>
                <li>cash: ${character[i].cash}</li>
                <button id="${character[i].id}">Select character</button>
                </ul>
            `
            document.getElementById(character[i].id).onclick = () => {
                document.getElementById('charBody').style = "display:none;"
                alt.emit('CharacterLogin',character[i],i)
            }
        }
    }
 })