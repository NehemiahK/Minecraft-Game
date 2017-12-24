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

                col.click(changeName);
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

        }

    }

    function changeName(){
        alert("that hurts");
    }



    makeBg();
    toolMaker();



});
