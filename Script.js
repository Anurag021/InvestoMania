//Working-- next activity
//1. add more stock prices 
//2. check woking for each condition -- color code check 
//3. need to add small window to add more stocks from website
//4. need to add a small window to delete stocks based on S.no 


const Stocks =[{
S_no: "1", Company_Name: "DEEPAKNITRATE", Category : "Chemical" , Average_Price:"2247.75",
 Current_Price:"2324.95",Lowest_Cut_Off:"2150", Highest_Cut_Off:"2500"},
{S_no: "2", Company_Name: "DMART", Category : "Cosumer Retail", Average_Price:"4542.1",
 Current_Price:"4814.4",Lowest_Cut_Off:"4600", Highest_Cut_Off:"5000"},
{S_no: "3",Company_Name: "HCLTECH", Category : "IT Services", Average_Price:"1229.73",
 Current_Price:"1229.73",Lowest_Cut_Off:"1100", Highest_Cut_Off:"1300"}] 



function generateTable(){

const table = document.querySelector(".table")

//Generating Table Dynamically from object values
Stocks.forEach((st)=>{

    const tr = document.createElement("tr")

    for (const key in st) {
        const td = document.createElement("td")
        td.appendChild(document.createTextNode(st[key]))
        tr.appendChild(td)
        }

    var colorCode = checkStockZone(st)
    tr.style.backgroundColor = colorCode;

    table.appendChild(tr)
    console.log("------------------------------------------");

})}

function checkStockZone( stock){
    var columnColor
    midPrice = (Number(stock.Highest_Cut_Off) + Number(stock.Lowest_Cut_Off))/2
    console.log(midPrice);

    var variation = (midPrice*0.04)
    maxVariationPrice =  midPrice + variation
    minVariationPrice =  midPrice - variation

    console.log( `stock current price is : ${stock.Current_Price}
    maximum variation price is ${maxVariationPrice}
    Minimum variation price is ${minVariationPrice}
    stock Lowest cutOFF is : ${stock.Lowest_Cut_Off}
    stock highest Cutoff is ${stock.Highest_Cut_Off}`);
    if ( stock.Current_Price <= maxVariationPrice && stock.Current_Price>=minVariationPrice){
        columnColor = "wheat"
    }
    else if( stock.Current_Price < minVariationPrice && stock.Current_Price > stock.Lowest_Cut_Off ){
        columnColor = "orange"
    }
    else if (stock.Current_Price > maxVariationPrice &&  stock.Current_Price < stock.Highest_Cut_Off){
        columnColor = "rgb(81, 196, 235)"
    }
    else if ( stock.Current_Price < stock.Lowest_Cut_Off){
        columnColor = "rgba(255, 100, 100, 0.952)"
    }
    else if ( stock.Current_Price > stock.Highest_Cut_Off){
        columnColor = "rgb(81, 235, 81)"
    }
    else { 
        columnColor = "cyan"
    }
    return columnColor

}

generateTable()