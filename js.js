//++++++++++++++++ global variables ++++++++++++++++++++++++//

var col = 9;
var row = 9;
var board  = new Array(col);
var lockedCells = [];

//++++++++++++++++ global definitions ++++++++++++++++++++++++//

var values =[1,2,3,4,5,6,7,8,9];

//++++++++++++++++ Helper Functions ++++++++++++++++++++++++//
// x is going top to bottom
// y = left to right


function createBoard(row,col){  
    
    for(i =0; i < col;i++){        
        board[i]=new Array(row);        
    }    
}

function populateBoard(board){
    for(x = 0; x < col; x++ ){
        for(y=0; y < row; y++){
            board[x][y]= 0;
        console.log(board[x][y]);
        }        
    }
}

function printBoard(board){
    for(x = 0;x < col; x++ ){
        for(y=0;y < row; y++){
            document.write(board[x][y]+" ");
        }
        document.write("<br>");
    }
    document.write("<br>");
}


function getValue(x,y){
    return board[x][y];    
}
function setValue(x,y,value){
    board[x][y] = value; 
    printBoard(board);
}

function isValid(curr_x,curr_y,value){    
        //check row
        for(i=0; i < row; i++){
           if(board[i][curr_y] == value){
               return false;
           }
        }
    //check col
        for(i=0; i < row; i++){
           if(board[curr_x][i] == value){
               return false;
           }
        }    
    //check diagonals:
        if(board[curr_x-1][curr_y-1]== value && typeof board[curr_x-1][curr_y-1]  != 'undefined'){
            return false;
        }
        else if(board[curr_x+1][curr_y-1]== value && typeof board[curr_x+1][curr_y-1]  != 'undefined'){
            return false;
        }
        else if(board[curr_x-1][curr_y+1]== value && typeof board[curr_x-1][curr_y+1]  != 'undefined'){
            return false;
        }
        else if(board[curr_x+1][curr_y+1]== value && typeof board[curr_x+1][curr_y+1]  != 'undefined'){
            return false;
        } 
    
    //is a valid entry
    return true;
    }

function CreateRandBoard(board){
    
    while(lockedCells.length != 3){
        let x=getRandNum(8);
        let y=getRandNum(8);
        let value = getRandNum(9);
        
        if(isValid(x,y,value)){
            let point = [x,y];
            lockedCells.push(point);
            setValue(x,y,value);            
        }        
    }
}

function getRandNum(max){
rN = Math.floor(Math.random()*Math.floor(max));
return rN;
}

function isLocked(lockedCells,curr_x,curr_y){
    
    for(i=0; i < lockedCells.length; i++){             
           
          if(lockedCells[i][0]== curr_x && lockedCells[i][1]== curr_y){
              return true;
          } 
        } 
return false;
}

    



//++++++++++++++++ Exceution ++++++++++++++++++++++++//
createBoard(row,col);
populateBoard(board);
printBoard(board);
CreateRandBoard(board);


//++++++++++++++++ Backtracking ++++++++++++++++++++++++//

function solve(board,values,curr_x,curr_y,lockedCells,count){
    
console.log("executing solve for [" + curr_x + "/" + curr_y + "] , count =" + count);
   
    //drop condition
    if(count == 81){        
        console.log("I have reached the last cell");
        printBoard(board);
        return true;
    }
    
    //current position is not locked
    if(isLocked(lockedCells,curr_x,curr_y)== false){
    
        console.log("cell["+curr_x+"/"+curr_y + "] is not locked");
        
        //get next number:
        for(i=0; i < values.length; i++){            
            
            console.log("filling in value "+values[i]);
            
            //chech if choosen number is vaild
            if(isValid(curr_x,curr_y,values[i])){                
            
                console.log("is valid");
                
                //check for next cell
                if(curr_y== 8){
                curr_x= curr_x +1;
                curr_y=0;   
        
                }
                else{
                    curr_y=curr_y+1;
                }
                // do algo for next cell:
                solve(board,values,curr_x,curr_y,lockedCells,count+1);
            }
        }    
    }
    //current position is locked => next cell
    console.log("cell["+curr_x+"/"+curr_y+"] is locked");
    if(curr_y== 8){
        curr_x= curr_x +1;
        curr_y=0;   
        
    }
    else{
        curr_x=curr_x+1;
        curr_y=curr_y+1;
    }
    
    
    
   //do algo for next cell 
    solve(board,values,curr_x,curr_y,lockedCells,count+1);
}


