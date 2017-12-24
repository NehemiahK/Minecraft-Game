$(document).ready(function(){
    function makeBg(){

        for (var i=0; i<20; i++){ // i is column

            var row = $("<div/>");
            $('#board').append(row);

            for (var j=0; j<30; j++){ // j is row
                    var col = $("<div/>");

                if(i==2 && j<=8 && j>=6){
                    col.addClass("clouds divBg");
                }
                if(i==6 && j==8){
                    col.addClass("clouds divBg");
                }

                if(i==3 && j>=5 &&j<=9){
                    col.addClass("clouds divBg");
                }
                if(i==5 && j>=7 &&j<=9){
                    col.addClass("clouds divBg");
                }

                if(i==4 && j>3 && j<12 ){
                    col.addClass("clouds divBg");
                }

                if (i==14 && j>13 && j<17){
                    col.addClass("rock divBg");
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

                if (i==15){
                    col.addClass("grass divBg");
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

    var toolArray = ["picaxe","shovel","axe"];

    var toolImages =["pickaxe.png","shovel.png","axe.png"];

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
    }

    /*the counts store the inventory of each resource*/

    var dirtCount=0;
    var grassCount =0;
    var leafCount =0;
    var treeCount=0;
    var rockCount =0;

    function divSelect(){
        var selectedDiv = $(this).attr("class");

        if(selectedDiv!='divBg'){
            //console.log(selectedDiv);
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
            }
            else if(selectedDiv =='rock divBg'){
                if(carrying=='tool picaxe'){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    rockCount++;
                }
            }
            var strNameUpdate = selectedDiv.replace(" divBg","");
            console.log(strNameUpdate);
            updateInventory(strNameUpdate);

        }




    }
    var resourceArray = ["grass","leaf","dirt","rock","tree"];

    var countNames= [grassCount,leafCount,dirtCount,rockCount,treeCount];

    function inventoryMaker(){
        for (var y=0; y<resourceArray.length;y++){
            var div = $("<div/>");
            var currCount = $("<p/>");
            currCount.attr('id',resourceArray[y] + 'Number');
            currCount.text(countNames[y]);
            div.addClass("inventory");
            div.addClass(resourceArray[y]);
            div.append(currCount);
            $('#inventory').append(div);

        }
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

    }

    makeBg();
    toolMaker();
    inventoryMaker();



});
