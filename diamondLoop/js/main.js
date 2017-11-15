const draw = function(height,str){
    var space = '';
    var row = '';
    const shortHand1 = (height+1)/2;
    const shortHand2 = (height-1)/2;
    for(diamondFirstPart=shortHand2; diamondFirstPart>=0; diamondFirstPart--){
        for(spaces1=diamondFirstPart; spaces1>0; spaces1--){
            space += ' ';
        }
        for(rowAdd1=1; rowAdd1<=(shortHand1-diamondFirstPart)*2-1; rowAdd1++){
            row += str;
        }
        console.log(space+row);
        space = '';
        row = '';
    }
    for(diamondSecondPart=1; diamondSecondPart<=shortHand2; diamondSecondPart++){
        for(spaces2=diamondSecondPart; spaces2>0; spaces2--){
            space += ' ';
        }
        for(rowAdd2=(shortHand1-diamondSecondPart)*2-1; rowAdd2>0; rowAdd2--){
            row += str;
        }
        console.log(space+row);
        space = '';
        row = '';
    }
};

const diamond = function(num,str){
    if(num%2 === 1){
        return draw(num,str);
    } else {
        return draw(num+1,str);
    }
};

diamond(185,'0')