console.log("exercice 3");
$(document).ready(function() {
    var sucre = 0;
    var typePieces = [200 , 100 , 50 , 20 , 10 , 5] ; 
    var pieces = [0, 0, 0, 0, 0, 0] ;

//_____________________________________GESTION Boissons
$( ".choix" ).click(function() {    
    let monId = $( this ).attr( 'id' ); 
    let selected = $( ".choix" ).hasClass( "selected" ); 
    selectDrink(selected, monId);
});

function selectDrink(doSelect, drink){
    if($('#' + drink).hasClass("selected") || drink === "reset")//SI la boisson a deja la classe "selected"
    {
        $('.choix').removeClass("selected");     //Enlever les choix "selected"     
        //$('.imgBoisson').removeClass("visible"); //Enlever les boisson associée "visible" 
        //$('#imgGobelet').addClass("visible"); //Remettre GOBELET Vide "visible" 
        
    }else{//----------------------------------------------//SINON
        //$('#imgGobelet').removeClass("visible"); //Enlever GOBELET Vide "visible"          
        $('#' + drink).addClass("selected");          //Rendre le choix "selected"    
        //$('#imgBoisson' + drink).addClass("visible"); //Rendre la boisson associée "visible"
        $('.choix').not('#' + drink).removeClass("selected");//Enleve toutes les class 'selected, sauf element cliquée            
        //$('.imgBoisson').not('#imgBoisson' + drink).removeClass("visible"); // /Enleve toutes les class 'selected, sauf element cliquée              
    }
}

function resetDrink(){
    selectDrink(true, "reset");
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
    console.log(nb);
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

});