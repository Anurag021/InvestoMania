//Working-- next activity
//implementing Async call to live price updater is still pending
//line 125 fetching current value using fetch function
//line 157 applying asynchronous function on this part
//line 153 to comment and Line 154 to uncomment

//completed Tasks
//1. Add window to add more stocks into website.
//2. Delete Functionality Done
//3. used alphavantage api to fetch live stock prices


const tableHeading = ["s.no","Company_Name","Category","Avg. Price",
"Current Price","Lowest Cut Off Price","Maximum Cut Off Price"]
const Stocks =[{
S_no: "1", Company_Name: "DEEPAKNITRATE", Category : "Chemical" , Average_Price:"2247.75",
 Current_Price:"2324.95",Lowest_Cut_Off:"2150", Highest_Cut_Off:"2500"},
{S_no: "2", Company_Name: "DMART", Category : "Cosumer Retail", Average_Price:"4542.1",
 Current_Price:"4814.4",Lowest_Cut_Off:"4600", Highest_Cut_Off:"5000"},
{S_no: "3",Company_Name: "HCLTECH", Category : "IT Services", Average_Price:"1229.73",
 Current_Price:"1229.73",Lowest_Cut_Off:"1100", Highest_Cut_Off:"1300"},
{S_no: "4",Company_Name: "LTI", Category : "IT Services", Average_Price:"6568.32",
 Current_Price:"6670.05",Lowest_Cut_Off:"6000", Highest_Cut_Off:"7300"},
{S_no: "5",Company_Name: "MPHASIS", Category : "IT Services", Average_Price:"3103.55",
 Current_Price:"3187.6",Lowest_Cut_Off:"3000", Highest_Cut_Off:"3450"},
{S_no: "6",Company_Name: "Test1", Category : "IT Services", Average_Price:"10",
 Current_Price:"13",Lowest_Cut_Off:"5", Highest_Cut_Off:"20"},
 {S_no: "7",Company_Name: "Test2", Category : "IT Services", Average_Price:"10",
 Current_Price:"22",Lowest_Cut_Off:"5", Highest_Cut_Off:"20"},
 {S_no: "8",Company_Name: "Test3", Category : "IT Services", Average_Price:"10",
 Current_Price:"4",Lowest_Cut_Off:"5", Highest_Cut_Off:"20"},
 {S_no: "9",Company_Name: "Test4", Category : "IT Services", Average_Price:"10",
 Current_Price:"15",Lowest_Cut_Off:"5", Highest_Cut_Off:"20"},
 {S_no: "10",Company_Name: "Test3", Category : "IT Services", Average_Price:"10",
 Current_Price:"10",Lowest_Cut_Off:"5", Highest_Cut_Off:"20"}
] 

// Getting Elements from HTML
var addMoreBtn = document.querySelector(".addMoreBtn")
const table = document.querySelector(".table")

var sNo = document.querySelector("#sNo");
var companyName = document.querySelector("#companyName") 
var Category = document.querySelector("#Category") 
var avgPrice = document.querySelector("#avgPrice") 
var currentPrice = document.querySelector("#currentPrice") 
var lowestCutOffPrice = document.querySelector("#lowestCutOffPrice") 
var maximumCutOffPrice = document.querySelector("#maximumCutOffPrice") 
var addvalidatioText = document.querySelector(".addvalidatioText")

var deleteSNo = document.querySelector("#deleteSNo")
var deleteName = document.querySelector("#deleteName")
var deleteBtn = document.querySelector(".deleteBtn")
var deleteInformation = document.querySelector(".deleteInformation")

var inputStockName = document.querySelector("#inputStockName")
var btnStock = document.querySelector(".btnStock")
//calling Eventlistners
addMoreBtn.addEventListener("click",AddMore)
deleteBtn.addEventListener("click",DeleteStock)
btnStock.addEventListener("click",fetchStockData)

//For Adding More Items into the list
function AddMore(){
    console.log("------------------------------");
    console.log("Added Button Clicked");
        if (sNo.value!=""&&companyName.value !=""&& Category.value !=""&&
        avgPrice.value !=""&& currentPrice.value !=""&& lowestCutOffPrice.value !=""&&
        maximumCutOffPrice.value !="") {
            Stocks.push(
                {S_no: sNo.value,Company_Name: companyName.value, Category : Category.value,
                Average_Price:avgPrice.value, Current_Price:currentPrice.value,
                Lowest_Cut_Off:lowestCutOffPrice.value, Highest_Cut_Off:maximumCutOffPrice.value}
            )
            console.log(sNo.value);    
            table.innerHTML = ""
            generateTable()  
            addvalidatioText.innerText = "Details Added Successfully"

        }
        else{
            console.log("Added Else Block");
            addvalidatioText.innerText = "Invalid Details"
        }
}

//Delete Stock from the List based on the Input values
function DeleteStock(){

    console.log("Delete Button Clicked");
    if(deleteSNo.value!="" || deleteName.value!="" ){
        for (var i =0 ; i<= Stocks.length-1; i++){
            if(Stocks[i].S_no == deleteSNo.value || Stocks[i].Company_Name == deleteName.value){
                console.log ("Deleted Stock")
                var Spliced = Stocks.splice(i,1)
                console.log(Spliced);
                table.innerHTML = ""
                generateTable()  
                addvalidatioText.innerText = "Details Deleted Successfully"
                deleteInformation.innerHTML = ""
            }} }
    else {
        console.log("else loop executed");
        deleteInformation.innerHTML = "<p style=color:red > Inalid Inputs</p>"
    }}

//Generating Table Heading Dynamically
function GenerateTableHeading(){
    var headingTR = document.createElement("tr")
   tableHeading.forEach((th)=>{
       var headingTH = document.createElement("th");
       headingTH.appendChild(document.createTextNode(th))
       headingTR.appendChild(headingTH)
   })
    table.appendChild(headingTR)
}

//Generating Table Dynamically from Array values
function generateTable(){
    GenerateTableHeading()
    // let stockSymbol = inputStockName.value
    Stocks.forEach((st)=>{
            
        const tr = document.createElement("tr")
        var stockValue = 1;  
            for (const key in st) {
                const td = document.createElement("td")
    
                //for getting value from fetch Api key
                // if(key === "Company_Name"){
                //       console.log("Company Name Trigger");
                //       var stockValue = fetchStockData(st[key])
                   
                // }
                // if(key === "Current_Price"){
                //     st[key] = stockValue
                // }
                
                td.appendChild(document.createTextNode(st[key]))
                tr.appendChild(td)
                }
        
        var colorCode = checkStockZone(st)
        tr.style.backgroundColor = colorCode;
    
        table.appendChild(tr)
        console.log("------------------------------------------");

    })}

//Fetching Stock market data using AlphaVantage API
    function fetchStockData(stockName){
        console.log("Fetch Stock Data function triggered");
        const Api_Key = "HGJWFG4N8AQ66ICD";     
        if(inputStockName.value !=""){
            let stockSymbol = inputStockName.value
            // let stockSymbol = stockName ; 
            let Api_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}.BSE&outputsize=compact&apikey=${Api_Key}`
            
                fetch(Api_Call).   
            then((response)=>{
                return response.json();
            }).then((data)=>{
                // console.log(data);
                for(var key in data['Time Series (Daily)']){
                    var stockPrice = data['Time Series (Daily)'][key]['1. open']
                    console.log(stockPrice)
                    break;
                }
            })
            
        }
        else{
            console.log("Invalid Name");
            stockPrice = 0
        }
    return stockPrice   
    }


// change color of the row based on stocks Value
function checkStockZone( stock){
    var columnColor
    midPrice = (Number(stock.Highest_Cut_Off) + Number(stock.Lowest_Cut_Off))/2
    console.log(midPrice);

    var variation = (midPrice*0.04)
    maxVariationPrice =  midPrice + variation
    minVariationPrice =  midPrice - variation

    // console.log( `stock current price is : ${stock.Current_Price}
    // maximum variation price is ${maxVariationPrice}
    // Minimum variation price is ${minVariationPrice}
    // stock Lowest cutOFF is : ${stock.Lowest_Cut_Off}
    // stock highest Cutoff is ${stock.Highest_Cut_Off}`);
    if ( Number(stock.Current_Price) <= Number(maxVariationPrice) && Number(stock.Current_Price)>=Number(minVariationPrice)){
        columnColor = "wheat"
        console.log("Its Normal thing");
    }
    else if( Number(stock.Current_Price) < Number(minVariationPrice) && Number(stock.Current_Price) > Number(stock.Lowest_Cut_Off)){
        columnColor = "orange"
        console.log("Its on the little higher side");
    }
    else if (Number(stock.Current_Price) > Number(maxVariationPrice) &&  Number(stock.Current_Price) < Number(stock.Highest_Cut_Off)){
        columnColor = "rgb(81, 196, 235)"
        console.log("can think buy it");
    }
    else if ( Number(stock.Current_Price) < Number(stock.Lowest_Cut_Off)){
        columnColor = "rgb(81, 235, 81)"
        console.log("this one is to buy green");
    }
    else if ( Number(stock.Current_Price) > Number(stock.Highest_Cut_Off)){
        columnColor = "rgba(255, 100, 100, 0.952)"
        console.log("this is to sell Red");
    }
    else { 
        columnColor = "cyan"
        console.log("this is the default");
    }
    return columnColor

}

generateTable()