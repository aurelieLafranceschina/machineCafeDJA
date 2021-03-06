console.log("exercice 3");
$(document).ready(function() {
    var sucre = 0;
    var boissonSelected = "";
    var monPrix = 0;
    var typePieces = [200 , 100 , 50 , 20 , 10 , 5] ; 
    let dispoPieces = [10 , 10 , 10 , 10, 10 , 10] ;    
    var pieces = [0, 0, 0, 0, 0, 0] ;
    var monnaie = 0;
    majMonnayeur();
    
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
    if($( ".choix" ).hasClass( "selected" ))
    {
        if(aRendre >= 0){
            let monSucre = sucre;  
            prepare(monSucre);
            addSugar(0); 
            $('.choix').removeClass("selected");     //Enlever les choix "selected"  
            aRendre = aRendre;
            afficheRendre = aRendre/100;
            alert("Je vous rend " + (afficheRendre) + "€"); 
            renduMonnaie(aRendre);     
        }else{
            alert("Argent insuffisant ");              
        }
    }else{
        alert("selectionnez une boisson")
    }
});

function renduMonnaie(argent){ 
    let sommeRendue = [] ;    
    for(i = 0 ; i < 6; i++){
        while (argent >= typePieces[i] && dispoPieces[i] > 0 ) 
        {
          sommeRendue.push(typePieces[i]) ;
          argent = argent - typePieces[i] ;
          dispoPieces[i] =dispoPieces[i] - 1 ;
        }
     }
     majMonnayeur();
    console.log(sommeRendue);
    pieces = [0, 0, 0, 0, 0, 0]
    majCredit();
}
    

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
        switch (boissonSelected) {
            case "Expresso":
                consumeWater(1);
                consumeCoffee(3);
                consumeLait(1);
                consumeGobs(1);
                consumeSucres(nbSugar);
                break;
            case "Capuchino":
                consumeWater(2);
                consumeCoffee(2);
                consumeLait(2);
                consumeGobs(1);
                consumeSucres(nbSugar);
            break;
            case "Chocolat":
                consumeWater(3);
                consumeChocolate(2);
                consumeLait(1);
                consumeGobs(1);
                consumeSucres(nbSugar);
            break;
            case "The":
                consumeWater(3);
                consumeThe(2);
                consumeGobs(1);
                consumeSucres(nbSugar);            
                break;
            default:
                alert("Erreur de boisson");
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
    let rendreTout = $( "#monnayeur strong" ).text();
    rendreTout= rendreTout*100;
    renduMonnaie(rendreTout)
    pieces = [0, 0, 0, 0, 0, 0]
    majCredit();
} 



function addCoin(coin){
    switch (coin) {
        case 5:
            pieces[5] = pieces[5]+1;
            dispoPieces[5] = dispoPieces[5]+1;
            break;
        case 10:
            pieces[4] = pieces[4]+1;
            dispoPieces[4] = dispoPieces[4]+1;
        break;
        case 20:
            pieces[3] = pieces[3]+1;
            dispoPieces[3] = dispoPieces[3]+1;
        break;
        case 50:
            pieces[2] = pieces[2]+1;
            dispoPieces[2] = dispoPieces[2]+1;
        break;
        case 1:
            pieces[1] = pieces[1]+1;
            dispoPieces[1] = dispoPieces[1]+1;
        break;
        case 2:
            pieces[0] = pieces[0]+1;
            dispoPieces[0] = dispoPieces[0]+1;
        break;
        default:
            alert("Erreur de Piece");
    }
    majCredit();
    majMonnayeur();
    
}


function majCredit()
{
    monnaie=0;
    for(i = 0 ; i < 6; i++){
        monnaie = monnaie + (typePieces[i] * pieces[i]);
     }
     monnaie = monnaie / 100;
     $( "#monnayeur strong" ).html(monnaie); 
}

//_____________________________________END GESTION Pieces

//_____________________________________GESTION Monnayeur
$( ".plus" ).click(function() {    
    //Récupérer uniquement les chiffres de l'id (pour connaitre la valeur de la piece)
        let maPieceMonnayeur = $( this ).parent("div").attr( 'id' ).replace(/[^0-9]/gi, ''); 
        let number = parseInt(maPieceMonnayeur, 10);
    //-------------------------------------------------------------------------------
    addMonnayeur(number);
});

$( ".moins" ).click(function() {    
    //Récupérer uniquement les chiffres de l'id (pour connaitre la valeur de la piece)
        let maPieceMonnayeur = $( this ).parent("div").attr( 'id' ).replace(/[^0-9]/gi, ''); //
        let number = parseInt(maPieceMonnayeur, 10);
    //-------------------------------------------------------------------------------
    removeMonnayeur(number);
});


function addMonnayeur(coin){
    switch (coin) {
        case 5:
            dispoPieces[5] = dispoPieces[5]+1;
            break;
        case 10:
            dispoPieces[4] = dispoPieces[4]+1;
        break;
        case 20:
            dispoPieces[3] = dispoPieces[3]+1;
        break;
        case 50:
            dispoPieces[2] = dispoPieces[2]+1;
        break;
        case 1:
            dispoPieces[1] = dispoPieces[1]+1;
        break;
        case 2:
            dispoPieces[0] = dispoPieces[0]+1;
        break;
        default:
            alert("Erreur de Piece");
    }
    majMonnayeur();
}

function removeMonnayeur(coin){
    switch (coin) {
        case 5:
            dispoPieces[5] = dispoPieces[5]-1;
            break;
        case 10:
            dispoPieces[4] = dispoPieces[4]-1;
        break;
        case 20:
            dispoPieces[3] = dispoPieces[3]-1;
        break;
        case 50:
            dispoPieces[2] = dispoPieces[2]-1;
        break;
        case 1:
            dispoPieces[1] = dispoPieces[1]-1;
        break;
        case 2:
            dispoPieces[0] = dispoPieces[0]-1;
        break;
        default:
            alert("Erreur de Piece");
    }
    majMonnayeur();
}


function majMonnayeur()
{
    let x = 0
    $( ".nbPieces h3" ).each(function( index, element ) {    
        $( this ).html( dispoPieces[x] );          
        x++;  
    });        
}


//_____________________________________END GESTION Monnayeur


let doseEau = 10;
function consumeWater(nbDoses){
    doseEau = doseEau - nbDoses ;
    $("#eau").html("<h2>"+doseEau+"</h2>");
}

 let doseCoffee = 10;
function consumeCoffee(nbDoses){
    doseCoffee = doseCoffee - nbDoses ; 
    $("#cafe").html("<h2>"+doseCoffee+"</h2>");
}
let doseChocolate = 10;
function consumeChocolate(nbDoses){
    doseChocolate = doseChocolate - nbDoses ; 
    $("#chocolat").html("<h2>"+doseChocolate+"</h2>");
}
let doseLait = 10;
function consumeLait(nbDoses){
    doseLait = doseLait - nbDoses ; 
    $("#lait").html("<h2>"+doseLait+"</h2>");
}

let doseThe = 10;
function consumeThe(nbDoses){
    doseThe = doseThe - nbDoses ; 
    $("#the").html("<h2>"+doseThe+"</h2>");
}

let doseGobs = 10;
function consumeGobs(nbDoses){
    doseGobs = doseGobs - nbDoses ; 
    $("#gobs").html("<h2>"+doseGobs+"</h2>");
}

let doseSucre = 10;
function consumeSucres(nbDoses){
    doseSucre = doseSucre - nbDoses ; 
    $("#sucre").html("<h2>"+doseSucre+"</h2>");
}
consumeWater(0);
consumeCoffee(0);
consumeChocolate(0);
consumeLait(0);
consumeThe(0);
consumeGobs(0);
consumeSucres(0);
});