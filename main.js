
window.onload = start;

var fieldsArray = [[],[],[]];  //Array with fields content (X or O)

var player1Turn = true; 
var markSound = new Audio("audio/mark.wav");
var winner = false;
var turnsCounter = 0;


function start()
{
    //Generate mark 3X3 divs field


    



    
    var div_content = "";


    for(i=0; i<3; i++)
    {
        for(j=0; j<3; j++)
        {
            var field = "f" + i + j; //field name
            var args = i + "," + j; //currently created field coordinates


            // Divs are divided for horizontal (class fieldHor) and vertical (class fieldVert) for correct borders drawing
            if(j==1 && j != i)
            {
                div_content = div_content + '<div class="fieldVert" onclick="mark('+ args + ')" id="' + field + '"> </div>';
            }
            else if(i==1 && j!=i)
            {             
                div_content = div_content + '<div class="fieldHor" onclick="mark('+ args + ')" id="' + field + '"> </div>';
                if((j+1) % 3 == 0 ) div_content = div_content + '<div style="clear:both;"></div>';   
            }
            else
            {
                div_content = div_content + '<div class="field" onclick="mark('+ args + ')" id="' + field + '"> </div>';
                if((j+1) % 3 == 0 ) div_content = div_content + '<div style="clear:both;"></div>';
            }
            
        }
    }

    //generate dynamic content: board
    document.getElementById("board").innerHTML = div_content;

}

function mark(x, y)
{
    markSound.play();
    turnsCounter++;

    var currentField = "f"+x+y; 

    if(player1Turn)
    {
       fieldsArray[x][y] = "X";
       player1Turn=false;            
    }
        
    else if(!player1Turn)
    {
       fieldsArray[x][y] = "O";
       player1Turn=true;
    }


    document.getElementById(currentField).innerHTML = fieldsArray[x][y];
    document.getElementById(currentField).onclick = null;
    

    checkFirstNeighbour(x,y);
    if(winner == false && turnsCounter==9){endGame("Nobody");}


}


//Check closest neighbours around checked field, then if any neighbour is the same check next neighbour in same direction
function checkFirstNeighbour(x, y)
{
    if(fieldsArray[x][y] == fieldsArray[x][(y+1)]){ checkSeckondNeighbour(x, y,0,1);} // 0, 1 - direction of shift
    else if(fieldsArray[x][y] == fieldsArray[x][(y-1)]){ checkSeckondNeighbour(x, y,0,-1);}
    if(x>0) //restrictions that prevents exceeding the array
    {
        if(fieldsArray[x][y] == fieldsArray[(x-1)][y]){ checkSeckondNeighbour(x, y,-1,0);}
    } 
    if(x<2)
    {
        if(fieldsArray[x][y] == fieldsArray[(x+1)][y]){ checkSeckondNeighbour(x, y,1,0);}
    } 
    if(x>0)
    {
        if(fieldsArray[x][y] == fieldsArray[(x-1)][(y-1)]){ checkSeckondNeighbour(x, y,-1,-1);}
    } 
    if(x<2)
    {
        if(fieldsArray[x][y] == fieldsArray[(x+1)][(y+1)]){ checkSeckondNeighbour(x, y,1,1);}
    } 
    if(x<2)
    {
        if(fieldsArray[x][y] == fieldsArray[(x+1)][(y-1)]){ checkSeckondNeighbour(x, y,1,-1);}
    } 
    if(x>0)
    {
        if(fieldsArray[x][y] == fieldsArray[(x-1)][(y+1)]){ checkSeckondNeighbour(x, y,-1,1);}
    } 


}

function checkSeckondNeighbour(x, y, xAdd, yAdd ) // xAdd, yAdd - direction of shift
{
    Nx = x+xAdd; //x of closest equal neigbour
    Ny = y+yAdd; //y of closest equal neigbour

    if(Nx+xAdd >= 0 && Nx+xAdd<=2 && Ny+yAdd >= 0 && Ny+yAdd<=2 ) //check if seckond neighbour in same direction is the same 
    {
        if(fieldsArray[Nx][Ny] == fieldsArray[(Nx + xAdd)][(Ny+ yAdd)]  )
        {   
            winner = true;         
            endGame(fieldsArray[Nx][Ny]);
        }
    }
    if((Nx-xAdd) ==1 || (Ny-yAdd) ==1 ) //check if field on the other side of checked field is the same (checked field is in the middle)
    {
            if(fieldsArray[Nx][Ny] == fieldsArray[(Nx - (xAdd) - (xAdd))][(Ny - (yAdd) - (yAdd))])
            {
                winner = true;
                endGame(fieldsArray[Nx][Ny]);
            }
    }

    
}
  


//Show endgame screen
function endGame(player)
{
    document.getElementById("overlay").innerHTML = '<p>' +player +'Wins!</p> <span class="reset" onclick="location.reload()">Again?</span>';
    document.getElementById("overlay").style.display = 'block';
   // document.getElementById("overlay").style.opacity = '1';
}


