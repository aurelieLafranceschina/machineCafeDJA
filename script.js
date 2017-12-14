console.log("exercice 3");
$(document).ready(function() {
    var sucre = 0;
    var boissonSelected = "";
    var monPrix = 0;
    var typePieces = [200 , 100 , 50 , 20 , 10 , 5] ; 
    var pieces = [0, 0, 0, 0, 0, 0] ;
    var monnaie = 0;

//_____________________________________GESTION Boissons
$( "#imgTouillette, #maBoisson, zoneSucres" ).click(function() { 
    resetDrink();    
});
   
$( ".choix" ).click(function() {    
    boissonSelected = $( this ).attr( 'id' ); 
    monPrix = $( this ).attr( 'href' ); 
    let selected = $( ".choix" ).hasClass( "selected" ); 
    selectDrink(selected, boissonSelected);

}); 

$( "#valid" ).click(function() { 
    let aRendre = (monnaie*100) - monPrix;
    if(aRendre >= 0){
        let monSucre = sucre;  
        prepare(monSucre);
        addSugar(0); 
        $('.choix').removeClass("selected");     //Enlever les choix "selected"       
        alert("Je vous rend " + aRendre); 
        resetCoins();     
    }else{
        alert("Argent insuffisant ");              
    }
    
});

function selectDrink(doSelect, drink){
    if($('#' + drink).hasClass("selected") || drink === "reset")//SI la boisson a deja la classe "selected"
    {
        $('.choix').removeClass("selected");     //Enlever les choix "selected"     
        
    }else{//----------------------------------------------//SINON
        $('#' + drink).addClass("selected");          //Rendre le choix "selected"    
        $('.choix').not('#' + drink).removeClass("selected");//Enleve toutes les class 'selected, sauf element cliquée            
    }
}

function resetDrink(){
    let mesSucres = "";
    $("#zoneSucres").html(mesSucres);    
    $('#imgGobelet').removeClass("visible"); //Enlever GOBELET Vide "visible"          
    $('.imgBoisson').removeClass("visible"); //Rendre la boisson associée "visible"
    $('.choix').removeClass("selected");     //Enlever les choix "selected"         
    addSugar(0);
}

function prepare(nbSugar){
    let mesSucres = "";
    if($('.choix').hasClass("selected")){
        if(nbSugar>0){
            for(i = 0; i < nbSugar ; i++)
            {
                mesSucres += "<img class='img-responsive sucres sucresBoisson' src='images/monSucre.png'/>";
            }
            $("#zoneSucres").html(mesSucres);
        }else{
            $("#zoneSucres").html(mesSucres);
        }
        $('#imgGobelet').removeClass("visible"); //Enlever GOBELET Vide "visible"          
        $('#imgBoisson' + boissonSelected).addClass("visible"); //Rendre la boisson associée "visible"
        $('.imgBoisson').not('#imgBoisson' + boissonSelected).removeClass("visible"); // /Enleve toutes les class 'selected, sauf element cliquée              
        sucre = 0;
        if(nbSugar>0){ 
            $('#imgTouillette').addClass("visible"); //Ajouter Touillette Vide "visible"            
        }
        
    }else{
        $("#zoneSucres").html(mesSucres);        
    }

}
//_____________________________________END GESTION Boissons

//_____________________________________GESTION SUCRE
$( ".sucres" ).click(function() {    
//Récupérer uniquement les chiffres de l'id (pour connaitre le nombre de sucre)
    let monId = $( this ).attr( 'id' ).replace(/[^0-9]/gi, ''); 
    sucre = parseInt(monId, 10);
//-------------------------------------------------------------------------------
    addSugar(sucre);
});

function addSugar(nb){
    let myImage = "images/sucreVert.png";               //Initialise le contenu de myImage par monSucre.png (sucre selectionné)

    $( ".sucres" ).each(function( index, element ) {    //Pour chaque element avec la class .sucres faire :

        if ( $( this ).is( "#sucre0" ) ) {//------------SI cet élément possede l'id "sucre0"
            $(element).attr("src", "images/sucreCroix.png"); //Remplacer l'image par le sucreCroix.png (aucun sucre selectionné)
        }else{//----------------------------------------SINON
            $(element).attr("src", myImage);            //remplacer l'element par le contenu de myImage
        }

        if ( $( this ).is( "#sucre"+nb ) ) {            //Si on est arrivé au sucre demandé (le bon id)
            myImage = "images/monSucre.png";            //Remplace le contenu de myImage par monSucre.png (sucre non selectionné)
        }
      });
}
//_____________________________________END GESTION SUCRE




//_____________________________________GESTION Pieces
$( ".pieces" ).click(function() {    
//Récupérer uniquement les chiffres de l'id (pour connaitre la valeur de la piece)
    let monId = $( this ).attr( 'id' ).replace(/[^0-9]/gi, ''); 
    let number = parseInt(monId, 10);
//-------------------------------------------------------------------------------
    addCoin(number);
});
   
$( "#renduMonnaie" ).click(function() {    
    resetCoins();
});

function resetCoins(){
    pieces = [0, 0, 0, 0, 0, 0]
    majMonnayeur();
} 

function addCoin(coin){
    switch (coin) {
        case 5:
            pieces[5] = pieces[5]+1;
            break;
        case 10:
            pieces[4] = pieces[4]+1;
        break;
        case 20:
            pieces[3] = pieces[3]+1;
        break;
        case 50:
            pieces[2] = pieces[2]+1;
        break;
        case 1:
            pieces[1] = pieces[1]+1;
        break;
        case 2:
            pieces[0] = pieces[0]+1;
        break;
        default:
            alert("Erreur de Piece");
    }
    majMonnayeur();
}


function majMonnayeur()
{
    monnaie=0;
    for(i = 0 ; i < 6; i++){
        monnaie = monnaie + (typePieces[i] * pieces[i]);
     }
     monnaie = monnaie / 100;
     $( "#monnayeur strong" ).html(monnaie); 
}

//_____________________________________END GESTION Pieces



function consumeWater(nbDoses){

    let doseEau = 10;
    doseEau = doseEau - nbDoses ;
}

function consumeCoffee(nbDoses){

    let doseCoffee = 10;
    doseCoffee = doseCoffee - nbDoses ; 
}

function consumeChocolate(nbDoses){

    let doseChocolate = 10;
    doseChocolate = doseChocolate - nbDoses ; 
}

function consumeLait(nbDoses){

    let doseLait = 10;
    doseLait = doseLait - nbDoses ; 
}

});