
window.onload = start;


//Create mark fields divs
function start()
{
    var div_content = "";

    for(i=0; i<3; i++)
    {
        for(j=0; j<3; j++)
        {
            var field = "f" + i + j;
            var args = i + "," + j;

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

    document.getElementById("board").innerHTML = div_content;

}

function mark(x, y)
{

}