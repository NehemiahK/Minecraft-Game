$(document).ready(function(){


    $("#myModal").modal('show');
    $("#tutorial").click(function() {
        $("#tutorialModal").modal('show');
        $("#myModal").modal('hide');
    });
    $("#returnToMain").click(function() {
        $("#tutorialModal").modal('hide');
        $("#myModal").modal('show');
    });
    $("#play").click(function() {
        $("#myModal").modal('hide');
    });




    function makeBg(){

        for (var i=0; i<20; i++){ // i is column

            var row = $("<div/>");
            $('#board').append(row);

            for (var j=0; j<30; j++){ // j is row
                var col = $("<div/>");

                if(i==2 && j<=8 && j>=6){
                    col.addClass("clouds");
                }
                if(i==6 && j==8){
                    col.addClass("clouds");
                }

                if(i==3 && j>=5 &&j<=9){
                    col.addClass("clouds");
                }
                if(i==5 && j>=7 &&j<=9){
                    col.addClass("clouds");
                }

                if(i==4 && j>3 && j<12 ){
                    col.addClass("clouds");
                }

                if (i==14 && j>13 && j<17){
                    col.addClass("rock divBg");
                }

                if(i==2 && j==5){
                    col.addClass("pidgey divBg");
                }
                if (i==14 && j>3 && j<7){
                    col.addClass("leaf divBg");
                }
                if (i==13 && j==5){
                    col.addClass("leaf divBg");
                }

                if (j>=22 && j<=26 && i<=10 && i>6){
                    col.addClass("leaf divBg");
                }

                if (i < 15 && i> 10  && j==24){
                    col.addClass("tree divBg");
                }

                if (i==14 && j==2 ){
                    col.addClass("bulbasaur divBg");
                }
                if (i==14 && j==13){
                    col.addClass("charmander divBg");
                }
                if (i==14 && j==17){
                    col.addClass("squirtle divBg");
                }
                if (i==14 && j==28){
                    col.addClass("mewtwo divBg");
                }

                if (i==15){
                    col.addClass("grass divBg");
                }
                if (i==18 && j==5){
                    col.addClass("diglett divBg");
                }
                else if (i>=16){
                    col.addClass("dirt divBg");
                }
                else{
                    col.addClass("divBg");
                }

                col.click(divSelect);
                row.append(col);


            }
        }

    }


    var toolArray = ["picaxe","shovel","axe","pokeball"];

    var toolImages =["pickaxe.png","shovel.png","axe.png","ball.png"];

    function toolMaker(){

        for (var t=0;t<toolArray.length;t++){
            var div = $("<div/>");
            div.addClass("tool " + toolArray[t]);
            var pic = $("<img/>");
            pic.attr("src",toolImages[t]);
            pic.attr("height","55px");
            div.append(pic);
            var words = $("<p/>");
            words.text(toolArray[t]);
            $('#tools').append(div);
            div.append(words);
            div.click(toolSelect);

        }

    }

    var selectedTool;
    var carrying;

    function toolSelect(){
        selectedTool = $(this);
        $('.tool').css("background-color","black");
        selectedTool.css("background-color","blue");
        carrying = selectedTool.attr("class");
        currentResource="";
    }

    /*the counts store the inventory of each resource*/

    var dirtCount=0;
    var grassCount =0;
    var leafCount =0;
    var treeCount=0;
    var rockCount =0;

    var pikaCount =1;
    var diglettCount =0;
    var pidgeyCount =0;
    var bulbasaurCount =0;
    var charmanderCount =0;
    var mewtwoCount =0;
    var squirtleCount =0;


    var backgroundTimer=0;

    var noClick= false;

    function blinkRed(){

            if (noClick==false){
                noClick = true;
                var backgroundInterval = setInterval(function(){
                    selectedTool.toggleClass("backgroundRed");
                    backgroundTimer++;

                    if(backgroundTimer==4){
                        clearInterval(backgroundInterval);
                        backgroundTimer=0;
                        noClick = false;
                    }
                },300)
            }

        }

        var healthbarTimer=0;
        function blinkRedPokemon(){
            if (noClick==false){
                noClick = true;

                var healthbarInterval = setInterval(function(){
                $("#healthbar").toggleClass("backgroundRed green");
                healthbarTimer++;

                if(healthbarTimer==4){
                    clearInterval(healthbarInterval);
                    healthbarTimer=0;
                    noClick = false;
                }
            },100)

            }
        }


    function divSelect(){

        var selectedDiv = $(this).attr("class");

        if(selectedDiv!='divBg'){

            if (selectedDiv =='dirt divBg' || selectedDiv =='grass divBg'){

                if(carrying=='tool shovel'){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");

                    if(selectedDiv =='dirt divBg'){
                        dirtCount++;
                    }
                    else if(selectedDiv =='grass divBg'){
                        grassCount++;
                    }
                }

                else if(carrying=='tool axe' || carrying=='tool picaxe' || carrying=='tool pokeball'){
                    blinkRed();

                }

            }

            else if(selectedDiv =='leaf divBg' ||selectedDiv =='tree divBg'){

                if(carrying=='tool axe'){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");

                    if(selectedDiv =='leaf divBg'){
                        leafCount++;

                    }
                    else if(selectedDiv =='tree divBg'){
                        treeCount++;
                    }
                }
                else if(carrying=='tool shovel' || carrying=='tool picaxe' || carrying=='tool pokeball'){
                    blinkRed();
                }
            }
            else if(selectedDiv =='rock divBg'){

                if(carrying=='tool picaxe'){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    rockCount++;
                }

                else if(carrying=='tool axe' || carrying=='tool shovel' || carrying=='tool pokeball'){
                    blinkRed();
                }
            }

            else if(selectedDiv =='pika divBg'){

                if(carrying=='tool pokeball'){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    pikaCount++;
                }

                else if(carrying=='tool axe' || carrying=='tool shovel' || carrying=='tool picaxe'){
                    blinkRed();
                }

            }
            else if(selectedDiv =='charmander divBg'){
                if (currentResource=='pika'  && pikaCount>0 || currentResource=='squirtle' && squirtleCount>0
                || currentResource=="bulbasaur" && bulbasaurCount>0 || currentResource=='diglett' && diglettCount>0
            || currentResource=='pidgey' && pidgeyCount>0 || currentResource=='mewtwo' && mewtwoCount>0){

                    if (currentResource=='pika'){
                        charHealth-= $('.pika').data("attack");
                    }
                    else if(currentResource=='squirtle'){
                            charHealth-= $(".squirtle").data("attack");
                    }
                    else if(currentResource=='bulbasaur'){
                            charHealth-= $(".bulbasaur").data("attack");
                    }
                    else if(currentResource=='diglett'){
                            charHealth-= $(".diglett").data("attack");
                    }
                    else if(currentResource=='pidgey'){
                            charHealth-= $(".pidgey").data("attack");
                    }
                    else if(currentResource=='mewtwo'){
                            charHealth-= $(".mewtwo").data("attack");
                    }

                    $(this).data("health",charHealth);
                    $('#healthbar').css("width",charHealth);
                    blinkRedPokemon();
                }

                if(carrying=='tool pokeball' && ($(this).data("health")<40 || capturedChar==true)){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    charmanderCount++;

                    if (capturedChar==false){
                        $('#capturedCaption').text("Charmander has been added to your Pokedex");
                        $(".captureMessage").modal('show');
                    }
                    capturedChar=true;
                }
            }
            else if(selectedDiv =='squirtle divBg'){

                if ((currentResource=='pika'  && pikaCount>0) ||currentResource=='charmander'  && charmanderCount>0 ||
                currentResource=="bulbasaur" && bulbasaurCount>0 || currentResource=='diglett' && diglettCount>0
                    || currentResource=='pidgey' && pidgeyCount>0 || currentResource=='mewtwo' && mewtwoCount>0){
                    if (currentResource=='pika'){
                        squirtHealth-= $(".pika").data("attack");
                    }
                    else if(currentResource=='charmander'){
                            squirtHealth-= $(".charmander").data("attack");
                    }
                    else if(currentResource=='bulbasaur'){
                            squirtHealth-= $(".bulbasaur").data("attack");
                    }
                    else if(currentResource=='diglett'){
                            squirtHealth-= $(".diglett").data("attack");
                    }
                    else if(currentResource=='pidgey'){
                            squirtHealth-= $(".pidgey").data("attack");
                    }
                    else if(currentResource=='mewtwo'){
                            squirtHealth-= $(".mewtwo").data("attack");
                    }


                    $(this).data("health",squirtHealth);
                    $('#healthbar').css("width",squirtHealth);
                    blinkRedPokemon();


                }

                if(carrying=='tool pokeball' && ( $(this).data("health")<40 || capturedSquirt==true)){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    squirtleCount++;

                    if (capturedSquirt==false){
                        $('#capturedCaption').text("Squirtle has been added to your Pokedex");
                        $(".captureMessage").modal('show');
                    }
                    capturedSquirt=true;
                }
            }

            else if(selectedDiv =='bulbasaur divBg'){

                if ((currentResource=='pika'  && pikaCount>0) ||currentResource=='charmander'  && charmanderCount>0 ||
            currentResource=='squirtle' && squirtleCount>0 || currentResource=='diglett' && diglettCount>0
        || currentResource=='pidgey' && pidgeyCount>0 || currentResource=='mewtwo' && mewtwoCount>0){

                    if (currentResource=='pika'){
                        bulbHealth-= $(".pika").data("attack");
                    }
                    else if(currentResource=='charmander'){
                            bulbHealth-= $(".charmander").data("attack");
                    }
                    else if(currentResource=='squirtle'){
                            bulbHealth-= $(".squirtle").data("attack");
                    }
                    else if(currentResource=='diglett'){
                            bulbHealth-= $(".diglett").data("attack");
                    }
                    else if(currentResource=='pidgey'){
                            bulbHealth-= $(".pidgey").data("attack");
                    }
                    else if(currentResource=='mewtwo'){
                            bulbHealth-= $(".mewtwo").data("attack");
                    }

                    $(this).data("health",bulbHealth);

                    $('#healthbar').css("width",bulbHealth);
                    blinkRedPokemon();
                }

                if(carrying=='tool pokeball' && ( $(this).data("health")<20 || capturedBulb==true)){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    bulbasaurCount++;

                    if (capturedBulb==false){
                        $('#capturedCaption').text("Bulbasaur has been added to your Pokedex");
                        $(".captureMessage").modal('show');
                    }
                    capturedBulb=true;
                }
            }

            else if(selectedDiv =='diglett divBg'){

                if ((currentResource=='pika'  && pikaCount>0) ||currentResource=='charmander'  && charmanderCount>0 ||
            currentResource=='squirtle' && squirtleCount>0 || currentResource=='bulbasaur' && bulbasaurCount>0
        || currentResource=='pidgey' && pidgeyCount>0 || currentResource=='mewtwo' && mewtwoCount>0){

                    if (currentResource=='pika'){
                        digHealth-= $(".pika").data("attack");
                    }
                    else if(currentResource=='charmander'){
                            digHealth-= $(".charmander").data("attack");
                    }
                    else if(currentResource=='squirtle'){
                            digHealth-= $(".squirtle").data("attack");
                    }
                    else if(currentResource=='bulbasaur'){
                            digHealth-= $(".bulbasaur").data("attack");
                    }
                    else if(currentResource=='pidgey'){
                            digHealth-= $(".pidgey").data("attack");
                    }
                    else if(currentResource=='mewtwo'){
                            digHealth-= $(".mewtwo").data("attack");
                    }

                    $(this).data("health",digHealth);
                    $('#healthbar').css("width",digHealth);
                    blinkRedPokemon();
                }

                if(carrying=='tool pokeball' && ( $(this).data("health")<20 || capturedDig==true)){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    diglettCount++;

                    if (capturedDig==false){
                        $('#capturedCaption').text("Diglett has been added to your Pokedex");
                        $(".captureMessage").modal('show');

                    }
                    capturedDig=true;
                }
            }
            else if(selectedDiv =='pidgey divBg'){

                if ((currentResource=='pika'  && pikaCount>0) ||currentResource=='charmander'  && charmanderCount>0 ||
            currentResource=='squirtle' && squirtleCount>0 || currentResource=='bulbasaur' && bulbasaurCount>0 ||
        currentResource=="diglett" && diglettCount>0 || currentResource=='mewtwo' && mewtwoCount>0){

                    if (currentResource=='pika'){
                        pidgHealth-= $(".pika").data("attack");
                    }
                    else if(currentResource=='charmander'){
                            pidgHealth-= $(".charmander").data("attack");
                    }
                    else if(currentResource=='squirtle'){
                            pidgHealth-= $(".squirtle").data("attack");
                    }
                    else if(currentResource=='bulbasaur'){
                            pidgHealth-= $(".bulbasaur").data("attack");
                    }
                    else if(currentResource=='diglett'){
                            pidgHealth-= $(".diglett").data("attack");
                    }
                    else if(currentResource=='mewtwo'){
                            pidgHealth-= $(".mewtwo").data("attack");
                    }

                    $(this).data("health",pidgHealth);
                    $('#healthbar').css("width",pidgHealth);
                    blinkRedPokemon();
                }

                if(carrying=='tool pokeball' && ( $(this).data("health")<20 || capturedPidg==true)){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    pidgeyCount++;

                    if (capturedPidg==false){
                        $('#capturedCaption').text("Pidgey has been added to your Pokedex");
                        $(".captureMessage").modal('show');

                    }
                    capturedPidg=true;
                }
            }

            else if(selectedDiv =='mewtwo divBg'){

                if ((currentResource=='pika'  && pikaCount>0) ||currentResource=='charmander'  && charmanderCount>0 ||
            currentResource=='squirtle' && squirtleCount>0 || currentResource=='bulbasaur' && bulbasaurCount>0 ||
        currentResource=="diglett" && diglettCount>0 || currentResource=='pidgey' && pidgeyCount>0){

                    if (currentResource=='pika'){
                        mewHealth-= $(".pika").data("attack");
                    }
                    else if(currentResource=='charmander'){
                            mewHealth-= $(".charmander").data("attack");
                    }
                    else if(currentResource=='squirtle'){
                            mewHealth-= $(".squirtle").data("attack");
                    }
                    else if(currentResource=='bulbasaur'){
                            mewHealth-= $(".bulbasaur").data("attack");
                    }
                    else if(currentResource=='diglett'){
                            mewHealth-= $(".diglett").data("attack");
                    }
                    else if(currentResource=='pidgey'){
                            mewHealth-= $(".pidgey").data("attack");
                    }

                    $(this).data("health",mewHealth);
                    $('#healthbar').css("width",mewHealth);
                    blinkRedPokemon();
                }

                if(carrying=='tool pokeball' && ( $(this).data("health")<20 || capturedMewtwo==true)){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    mewtwoCount++;

                    if (capturedMewtwo==false){
                        $('#capturedCaption').text("Mewtwo has been added to your Pokedex");
                        $(".captureMessage").modal('show');

                    }
                    capturedMewtwo=true;
                }
            }


            var strNameUpdate = selectedDiv.replace(" divBg","");
            updateInventory(strNameUpdate);

        }
        if (selectedDiv=='divBg'){

            if(currentResource=='pika' && pikaCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass("pika divBg");
                pikaCount--;
            }

            if(currentResource=='tree' && treeCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass("tree divBg");
                treeCount--;
            }

            else if(currentResource=='leaf' && leafCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass("leaf divBg");
                leafCount--;
            }
            else if(currentResource=='dirt' && dirtCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass("dirt divBg");
                dirtCount--;
            }
            else if(currentResource=='rock' && rockCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass("rock divBg");
                rockCount--;
            }
            else if(currentResource=='grass' && grassCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass("grass divBg");
                grassCount--;
            }
            else if(currentResource=='charmander' && charmanderCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass("charmander divBg");
                charmanderCount--;
            }
            else if(currentResource=='squirtle' && squirtleCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass("squirtle divBg");
                squirtleCount--;
            }
            else if(currentResource=='bulbasaur' && bulbasaurCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass("bulbasaur divBg");
                bulbasaurCount--;
            }
            else if(currentResource=='diglett' && diglettCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass("diglett divBg");
                diglettCount--;
            }
            else if(currentResource=='pidgey' && pidgeyCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass("pidgey divBg");
                pidgeyCount--;
            }
            else if(currentResource=='mewtwo' && mewtwoCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass("mewtwo divBg");
                mewtwoCount--;
            }

            updateInventory(currentResource);
        }

    }

    var resourceArray = ["grass","leaf","dirt","rock","tree","pika","diglett","pidgey","bulbasaur",
    "charmander","mewtwo","squirtle"];

    var countNames= [grassCount,leafCount,dirtCount,rockCount,treeCount,pikaCount,diglettCount,pidgeyCount,
    bulbasaurCount,charmanderCount,mewtwoCount,squirtleCount];

    function inventoryMaker(){
        for (var y=0; y<resourceArray.length;y++){
            var div = $("<button/>");
            var currCount = $("<p/>");
            currCount.attr('id',resourceArray[y] + 'Number');
            currCount.text(countNames[y]);
            div.addClass("inventory");
            div.addClass(resourceArray[y]);
            div.append(currCount);
            $('#inventory').append(div);
            div.click(getResource);

        }
    }
    var currentResource;

    function getResource(){
        var curr = $(this).attr("class");
        var resourceName = curr.replace("inventory ","");
        currentResource = resourceName;
        carrying="";
        $('.tool').css("background-color","black");
    }

    function updateInventory(resourceToUpdate){
         if (resourceToUpdate=='leaf'){
            $('#leafNumber').html(leafCount);
         }
         else if(resourceToUpdate=='tree'){
             $('#treeNumber').html(treeCount);
         }
         else if(resourceToUpdate=='dirt'){
             $('#dirtNumber').html(dirtCount);
         }
         else if(resourceToUpdate=='grass'){
             $('#grassNumber').html(grassCount);
         }
         else if(resourceToUpdate=='rock'){
             $('#rockNumber').html(rockCount);
         }
         else if(resourceToUpdate=='pika'){
             $('#pikaNumber').html(pikaCount);
         }
         else if(resourceToUpdate=='charmander'){
             $('#charmanderNumber').html(charmanderCount);
         }
         else if(resourceToUpdate=='squirtle'){
             $('#squirtleNumber').html(squirtleCount);
         }
         else if(resourceToUpdate=='bulbasaur'){
             $('#bulbasaurNumber').html(bulbasaurCount);
         }
         else if(resourceToUpdate=='diglett'){
             $('#diglettNumber').html(diglettCount);
         }
         else if(resourceToUpdate=='pidgey'){
             $('#pidgeyNumber').html(pidgeyCount);
         }
         else if(resourceToUpdate=='mewtwo'){
             $('#mewtwoNumber').html(mewtwoCount);
         }
    }

    var resetButton = $('#restore').click(resetBoard);

    function resetBoard(){
        $("#board").html("");
        $("#tools").html("");
        $("#inventory").html("");

        dirtCount=0;
        grassCount =0;
        leafCount =0;
        treeCount=0;
        rockCount =0;
        pikaCount =1;
        selectedTool="";

        makeBg();
        toolMaker();
        inventoryMaker();
    }


    makeBg();
    toolMaker();
    inventoryMaker();

    var charHealth = 60;
    var squirtHealth= 100;
    var digHealth = 101;
    var mewHealth = 170;
    var pidgHealth = 100;
    var bulbHealth = 120;

    var num;

    var capturedChar=false;
    var capturedSquirt=false;
    var capturedBulb=false;
    var capturedDig=false;
    var capturedPidg=false
    var capturedMewtwo=false;

    $(".diglett").data("health",digHealth);
    $(".diglett").data("attack",13);

    $(".squirtle").data("health",squirtHealth);
    $(".squirtle").data("attack",15);

    $(".pika").data("attack",5);

    $(".charmander").data("health",charHealth);
    $(".charmander").data("attack",10);

    $(".mewtwo").data("health",mewHealth);
    $(".mewtwo").data("attack",50);

    $(".pidgey").data("health",pidgHealth);
    $(".pidgey").data("attack",6);

    $(".bulbasaur").data("health",bulbHeath);
    $(".bulbasaur").data("attack",19);


    $(".charmander,.squirtle,.diglett,.mewtwo,.pidgey,.bulbasaur").hover(function(){
        num = $(this).data("health");
        $('#healthbar').css("width",num);
    });

    $(".charmander,.squirtle,.diglett,.mewtwo,.pidgey,.bulbasaur").mouseout(function(){
        $('#healthbar').css("width","180px");
    });


});
