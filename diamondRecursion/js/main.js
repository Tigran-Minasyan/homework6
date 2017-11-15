const draw = function(height,str){

    var diamondNum1 = (height+1)/2;
    var diamondNum2 = diamondNum1-1;

    const rowDraw1 = function(rowCount1,str){

        if(rowCount1 > height){
            return '';
        }

        const row = str + rowDraw1(rowCount1 + 1,str);
        return row;
    };

    const rowDraw2 = function(rowCount2,str){

        if(rowCount2 <= 0){
            return '';
        }

        const row = str + rowDraw2(rowCount2 - 1,str);
        return row;
    };

    const rowSpace1 = function(spaceCount1){

        if(spaceCount1 <= 0){
            return '';
        }

        const space = ' ' + rowSpace1(spaceCount1 - 1);
        return space;
    };

    const rowSpace2 = function(spaceCount2){

        if(spaceCount2 >= (height-1)/2){
            return '';
        }

        const space = ' ' + rowSpace2(spaceCount2 + 1);
        return space;
    };

    const draw1 = function(num1,num2){
        const row1 = rowSpace1(num1) + rowDraw1(num2,str);
        return row1;
    };

    const draw2 = function(num1,num2){
        const row2 = rowSpace2(num1) + rowDraw2(num2,str);
        return row2;
    };
    
    const loop = function(num){

        if(num <= 0){
            return '';
        }

        if(num > (height-1)/2){
            console.log(draw1(diamondNum1-1,diamondNum1+diamondNum1-1));
            diamondNum1--;
        } else {
            console.log(draw2(diamondNum2-1,diamondNum2+diamondNum2-1));
            diamondNum2--;
        }

        return loop(num-1);
    };

    return loop(height);
};

const diamond = function(num,str){
    if(num%2 === 1){
        return draw(num,str);
    } else {
        return draw(num+1,str);
    }
};

diamond(185,'0');