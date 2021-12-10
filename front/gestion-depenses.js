window.addEventListener("DOMContentLoaded"  , async() => {

    const reponse = await fetch("http://localhost:3000/depenses" )
    const depenses = await reponse.json(); 
    
    document.querySelector(".js-list-depenses").innerHTML = genererFormsTaches(depenses);

    gererCalcul(depenses);
    // écouter quand on clique dans la zone js-list-depenses
    document.querySelector(".js-list-depenses").addEventListener("click" , async e => {
        e.preventDefault();
        if(e.target.className.includes("btn")){
            const form = e.target.parentNode;
            const action = e.target.value ;
            const id = form.id.value
            if(action == "modifier"){
                const data = {
                    id : id,
                    name : form.name.value ,
                    montant : parseFloat(form.montant.value)
                }
                const options = { method : "PUT" , body : JSON.stringify(data) , headers : {'Content-Type': 'application/json'} }
                await fetch("http://localhost:3000/depenses/"+id , options);
                window.location.reload;
            }else if(action == "supprimer"){
                const options = {method : "DELETE"}
                await fetch("http://localhost:3000/depenses/"+id , options);
            }
        }
    })
})

function genererFormsTaches(data){

    if(data.length === 0) return "<p>Veuillez ajouter des dépenses</p>";
    let result = `
        <div class="row>
            <form class="d-flex my-3 fdepense">
            <span placeholder="id" class="col-md-3" style="flex-grow:1"> ID </span>
            <span placeholder="nom" class="col-md-3" style="flex-grow:1;margin-left:20em;"> NOM </span>
            <span placeholder="montant" class="col-md-3" style="flex-grow:1;margin-left:20em;"> MONTANT </span>
            <span  class="col-md-3" style="margin-left:20em;"> ACTION </span>
        </div>
    `;
    result += data.map( d => {
        return `
        <div class="row">
            <form class="d-flex my-3 fdepense">
            <input id="id" type="text" name="id" placeholder="id" class="form-input col-md-3" style="flex-grow:1" value="${d.id}">
            <input type="text" name="name" placeholder="nom" class="form-input col-md-3" style="flex-grow:1" value="${d.name}">
            <input type="number" name="montant" placeholder="montant" class="form-input col-md-3" style="flex-grow:1" value="${d.montant}">
            <input type="submit" class="btn btn-warning mx-3" value="modifier">
            <input type="submit" class="btn btn-danger" value="supprimer">
            </form>
        </div>
        `
    } ).join("");

    return result;
}

function gererCalcul(depenses){
    // gestion du Total/Entrant/Sortant  
    let total = 0;
    for(let i = 0; i < depenses.length; i++){
        console.log(depenses[i].montant);
        total += parseFloat(depenses[i].montant);
    }
    console.log(total);

    let sortant = 0;
    for(let i = 0; i < depenses.length; i++){
        console.log(depenses[i].montant);
        if(parseFloat(depenses[i].montant) > 0)
            sortant += parseFloat(depenses[i].montant);
    }

    let entrant = 0;
    for(let i = 0; i < depenses.length; i++){
        console.log(depenses[i].montant);
        if(parseFloat(depenses[i].montant) < 0)
            entrant += parseFloat(depenses[i].montant);
    }
    console.log(total);
    document.querySelector(".js-compteur-total").innerHTML = ""+total; 
    document.querySelector(".js-compteur-sortant").innerHTML = ""+sortant; 
    document.querySelector(".js-compteur-entrant").innerHTML = ""+entrant;
}