const sortBtn = document.getElementById("sort");
const vote = document.getElementById("Vote");


document.getElementById('search-button').addEventListener('click', () => {
  const cryptoName = document.getElementById('crypto-input').value.trim().toLowerCase();
  if (cryptoName) {
    fetchTokenomics(cryptoName);
  } else {
    alert('Please enter a cryptocurrency name');
  }
});



// Wrapping the fetch call in an async function

const trendingModal = document.getElementById("trendingModal");

// Call the function to fetch the fear and greed index

let data;
async function fetchTokenomics(cryptoName) {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName}`);
    if (!response.ok) {
      throw new Error('Cryptocurrency not found');
    }
    data = await response.json();
    displayTokenomics(data);


    console.log(data);
  } catch (error) {
    alert(error.message);
  }
}
let trendingcoinsData;

fetchtrendingcoinsData();
  async function fetchtrendingcoinsData() {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/search/trending`);
      if (!response.ok) {
        throw new Error('Cryptocurrency not found');
      }
       trendingcoinsData = await response.json();
     
  
  
      console.log(trendingcoinsData.coins[0]);
      trendingcoinsData.coins.forEach(element => {
        trendingModal.innerHTML +=  `<div class="tokenomics-item" id="name"onclick="moreInfo(0);" >
        <span>Name:</span> ${element.item.name} |     <span>Market Cap:</span> ${element.item.data.market_cap}  |<span> Price Change 24H:</span> ${Math.floor(element.item.data.price_change_percentage_24h.usd
      )}%
      </div>`
      console.log(trendingModal.innerHTML);
      });
    } catch (error) {
      alert(error.message);
    }
  }
  

  

const tokenomicsDiv = document.getElementById('tokenomics');
function displayTokenomics(data) {

  tokenomicsDiv.innerHTML = `
  <div class="tokenomics-item" >
<img src="${data.image.small}"/>
</div>
    <div class="tokenomics-item" id="name"onclick="moreInfo(0);" >
      <span>Name:</span> ${data.name}
    </div>
    <div class="tokenomics-item" id="symbol" onclick="moreInfo(1)">
      <span>Symbol:</span> ${data.symbol.toUpperCase()}
    </div>
    <div class="tokenomics-item" id="marketCap"  onclick="moreInfo(3)">
      <span>Market Cap Rank:</span> ${data.market_cap_rank}
    </div>
    <div class="tokenomics-item" id="currentPrice"  onclick="moreInfo(2)">
      <span>Current Price (USD):</span> $${data.market_data.current_price.usd}
    </div>
    <div class="tokenomics-item" id="totalSupply" onclick="moreInfo(4)">
      <span>Total Supply:</span> ${data.market_data.total_supply ? data.market_data.total_supply : 'N/A'}
    </div>
    <div class="tokenomics-item" id="circulatingSupply" onclick="moreInfo(5)">
      <span>Circulating Supply:</span> ${data.market_data.circulating_supply}
    </div>
    <div class="tokenomics-item" id="lockedSupply" onclick="moreInfo(6)">
    <span>Locked Supply:</span> ${data.market_data.total_supply-data.market_data.circulating_supply}
  </div>


<div class="tokenomics-item" >
<a href="https://www.binance.com/en-GB/trade/${data.symbol}_USDT?_from=markets&type=spot">Buy/Sell ${data.symbol.toUpperCase()} </a> 

</div>
<div class="tokenomics-item" >
<a href="https://www.google.com/search?q=${data.name}&sca_esv=5cb10fd6398eaebd&rlz=1C1ONGR_en-GBGB962GB962&biw=2048&bih=1023&tbm=nws&sxsrf=ADLYWIIaIx64WiSZo2hTWrbkiqJM5G2MjQ%3A1716684696998&ei=mIdSZoPQPO6xhbIPi861yAY&ved=0ahUKEwiD_LjsjKqGAxXuWEEAHQtnDWkQ4dUDCA0&uact=5&oq=bitcoin&gs_lp=Egxnd3Mtd2l6LW5ld3MiB2JpdGNvaW4yDRAAGIAEGLEDGEMYigUyDRAAGIAEGLEDGEMYigUyEBAAGIAEGLEDGEMYgwEYigUyEBAAGIAEGLEDGEMYgwEYigUyDRAAGIAEGLEDGEMYigUyDRAAGIAEGLEDGEMYigUyDRAAGIAEGLEDGEMYigUyChAAGIAEGEMYigUyChAAGIAEGEMYigUyCBAAGIAEGLEDSM4FUABYzARwAHgAkAEAmAFOoAHjA6oBATe4AQPIAQD4AQGYAgegAvMDwgILEAAYgAQYsQMYgwGYAwCSBwE3oAfTJg&sclient=gws-wiz-news">Latest News</a> 

</div>
  `;
 // document.getElementById("voteText").textContent=`How do you feel about ${data.symbol.toUpperCase()} today?`;
  document.getElementById("favourite").removeAttribute("hidden");
 // vote.removeAttribute("hidden");
  console.log(data.image.small);
  tokenomicsDiv.style.opacity = '0';
  setTimeout(() => {
    tokenomicsDiv.style.opacity = '1';
  }, 10);  // Slight delay to trigger animation


  // Calculate and display volatility
  const volatility = calculateVolatility(data);

  calculateVolatility(data);
 
  priceSurge()
  tokenomicsDiv.innerHTML += `
    <div class="tokenomics-item"onmouseover="moreInfo(8)>
      <span>Volatility:</span> ${volatility.toFixed(2)}
    </div>
  `;
  tokenomicsDiv.innerHTML +=  volatlityLevel(volatility);

}

function calculateVolatility(data) {
  console.log("hello");
  const priceChanges = [
    data.market_data.price_change_percentage_24h,
    data.market_data.price_change_percentage_7d,
    data.market_data.price_change_percentage_14d,
    data.market_data.price_change_percentage_30d,
    data.market_data.price_change_percentage_60d,
    data.market_data.price_change_percentage_200d,
    data.market_data.price_change_percentage_1y
  ];
console.log(priceChanges);
  const priceChangeMean = priceChanges.reduce((acc, val) => acc + val, 0) / priceChanges.length;

  const volatility = Math.sqrt(
    priceChanges.reduce((acc, val) => acc + Math.pow(val - priceChangeMean, 2), 0) / priceChanges.length
  );

    
  return volatility;
}
function volatlityLevel(volatility){

if(volatility >=0 && volatility <=100){
return  `
  <div class="tokenomics-item">
    <span>${data.symbol.toUpperCase()} has not been volatile  your capital isn't at as high risk</span>
  </div>
`;
}
else{
return `
  <div class="tokenomics-item">
    <span>${data.symbol.toUpperCase()} is volatile your capital is at risk</span>
  </div>
`;

}


}


function disclaimer() {
  alert("No Investment Advice. The information provided on this website does not constitute investment advice, financial advice, trading advice, or any other sort of advice and you should not treat any of the website's content as such. CryptoFlux does not recommend that any cryptocurrency should be bought, sold, or held by you. Do conduct your own due diligence and consult your financial advisor before making any investment decisions. Accuracy of Information. CryptoFlux will strive to ensure accuracy of information listed on this website although it will not hold any responsibility for any missing or wrong information. CryptoFlux provides all information as is. You understand that you are using any and all information available here at your own risk. Non Endorsement. The appearance of third party advertisements and hyperlinks on CryptoFlux does not constitute an endorsement, guarantee, warranty, or recommendation by CryptoFlux. Do conduct your own due diligence before deciding to use any third party services.");
}

function moreInfo(metric) {
  const metrics = ["This is the name of the currency",
  "The abbreviated name of a cryptocurrency's coin or token for trading purposes, which is similar to a stock symbol on the stock market. For example, BTC is Bitcoin; ETH is Ethereum. For a compilation of thousands of symbols, visit CryptoCompare.com. See native cryptocurrency and crypto glossary.",
  "Current price of the coin",
  "The value of the total number of coins of a particular cryptocurrency in circulation multiplied by the current price. Market cap is never 100% perfect because many private keys have been lost and those coins are gone forever",
  "Total Supply refers to the total amount of coins or tokens of a specific cryptocurrency that have been created or mined, that are in circulation, including those that are locked or reserved. Coins that have been burned or destroyed should be subtracted from this amount.",
  "Circulating Supply is the total number of coins or tokens that are actively available for trade and are being used in the market and in general public. When a company creates a particular number of tokens, only a portion of it instead of the whole supply is made available for circulation.",
  "Tokens that have been locked up are not part of the circulating supply. These are designed to terminate withdrawals after a cryptocurrency's debut, so no team members or investors will be able to acquire their tokens until the lockup period expires."
]
  alert(metrics[metric]);
}


function checkLocalStorage(){
  for (let j= 0; localStorage.length >j ; j++)
    {
      console.log(j)
      if (localStorage.getItem(localStorage.key(j)).includes(data.image.small))  {
return true; 

  }
 
 
  }
  return false;
}


function favourite(){
  for (let j= 0; localStorage.length >j ; j++)
    {
      console.log(j)
  console.log(localStorage.getItem(localStorage.key(j))  )


  }

console.log(modal.innerHTML);
if(!checkLocalStorage())

  {   localStorage.setItem('coinName'+localStorage.length, JSON.stringify(data))


  }
  else{
console.log("Coin already exists in local storage!")
  }



  


}
function priceSurge(){


  switch(true){
    case data.market_data.price_change_percentage_7d <=3 &&  data.market_data.price_change_percentage_7d >=-3:
      tokenomicsDiv.innerHTML += `<div class="tokenomics-item">
          <span>${data.symbol.toUpperCase()} has been stable recently</span>
        </div>`;
        break;

   case data.market_data.price_change_percentage_7d >3  && data.market_data.price_change_percentage_7d <=6 :
 tokenomicsDiv.innerHTML += `<div class="tokenomics-item">
     <span>There has been a slight increase in price recently</span>
   </div>`;
   break;
  
   case data.market_data.price_change_percentage_7d >6  && data.market_data.price_change_percentage_7d <=10 :
 tokenomicsDiv.innerHTML += `<div class="tokenomics-item">
     <span>There has been a moderate surge in price recently</span>
   </div>`;
   break;
   case data.market_data.price_change_percentage_7d >10  :
    tokenomicsDiv.innerHTML += `<div class="tokenomics-item">
        <span>There has been a sudden surge in price ,invest with caution.</span>
      </div>`;
      break;
  default:
    tokenomicsDiv.innerHTML += `<div class="tokenomics-item">
    <span>${data.symbol.toUpperCase()} has recently fallen in value, invest with caution</span>
  </div>`
  
}
}
var modal = document.getElementById("myModal");


// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var trendingBtn = document.getElementById("trendingBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
let a = 0;// When the user clicks the button, open the modal 
let l = 0;
btn.onclick = function() {
  modal.style.display = "block";

  for (let x = 0; x < localStorage.length; x++) { 
    let key = localStorage.key(x);
    let item = JSON.parse(localStorage.getItem(key));

    // Check if the modal already includes the item
    if (!modal.innerHTML.includes(item.name)) {
      modal.innerHTML += `
        <div class="tokenomics-item" id="${item.name}">
          <span>Name:</span> ${item.name} <span onclick="sort()">Market Cap: </span> $${item.market_data.current_price.usd}
        </div>
      `;
    }
  }
};

trendingBtn.onclick = function() {
  trendingModal.style.display = "block";

  
    
  
};



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal|| event.target === trendingModal) {
    modal.style.display = "none";
    trendingModal.style.display = "none";
  }
}


console.log(localStorage.key(localStorage.length-1));
console.log(JSON.parse(localStorage.getItem(localStorage.key(localStorage.length-1))).name);
JSON.stringify(localStorage.getItem("coinName"+1))
console.log(modal.innerHTML)


let ascending = true;

function sort() {
  const marketCaps = [];
  const items = [];

  // Retrieve items and their market caps from localStorage
  for (let x = 0; x < localStorage.length; x++) {
    let key = localStorage.key(x);
    let item = JSON.parse(localStorage.getItem(key));
    items.push(item);
    marketCaps.push(item.market_data.current_price.usd);
  }

  // Sort market caps in ascending and descending order
  const ascendingMarketCaps = [...marketCaps].sort((a, b) => a - b);
  const descendingMarketCaps = [...marketCaps].sort((a, b) => b - a);

  // Clear modal content
  modal.innerHTML = "";

  // Function to get item by market cap
  const getItemByMarketCap = (marketCap) => {
    return items.find(item => item.market_data.current_price.usd === marketCap);
  };

  // Populate modal with ascending market caps

if(ascending)
  {
    modal.innerHTML += `<button id="sort" onclick="sort()">Sort by descending</button>`
    ascendingMarketCapsFunction(ascendingMarketCaps,getItemByMarketCap);

ascending= false;

  }
  else{
    modal.innerHTML += `<button id="sort" onclick="sort()">Sort by ascending</button>`
    descendingMarketCapsFunction(descendingMarketCaps,getItemByMarketCap);

    ascending= true;

  }
  // Add close button
  modal.innerHTML += `<span class="close">&times;</span>`;
}


function descendingMarketCapsFunction(descendingMarketCaps,getItemByMarketCap){
  for (let marketCap of descendingMarketCaps) {
    let item = getItemByMarketCap(marketCap);
    modal.innerHTML += `
      <div class="tokenomics-item" id="${item.name}">
        <span>Name:</span> ${item.name} <span>Market Cap:</span> $${marketCap}
      </div>
    `;
  }

  
}
function ascendingMarketCapsFunction(ascendingMarketCaps,getItemByMarketCap){


  for (let marketCap of ascendingMarketCaps) {
    let item = getItemByMarketCap(marketCap);
    modal.innerHTML += `
      <div class="tokenomics-item" id="${item.name}">
        <span>Name:</span> ${item.name} <span>Market Cap:</span> $${marketCap}
      </div>
    `;
  }
}
console.log(document.getElementById("sort").textContent)
