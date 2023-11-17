window.onload = function() {
  // global variables
  const imagesToDisplay = 3;
  let rounds = 25;

  const chosenProducts = [];
  let container = document.getElementById('productContainer');
  let resultsContainer = document.getElementById('results');


  class OddProduct {
    constructor (name, path) {
      this.name = name;
      this.path = path;
      this.timesShown = 0;
      this.timesClicked = 0;
      OddProduct.objectList.push(this);
    }

    static objectList = [];

    incrementViews() {
      this.timesShown++;
    }

    incrementClicks() {
      this.timesClicked++;
    }
  }

  const bag = new OddProduct('bag', 'img/bag.jpg');
  const banana = new OddProduct('banana', 'img/banana.jpg');
  const bathroom = new OddProduct('bathroom', 'img/bathroom.jpg');
  const boots = new OddProduct('boots', 'img/boots.jpg');
  const breakfast = new OddProduct('breakfast', 'img/breakfast.jpg');
  const bubblegum = new OddProduct('bubblegum', 'img/bubblegum.jpg');
  const chair = new OddProduct('chair', 'img/chair.jpg');
  const cthulhu = new OddProduct('cthulhu', 'img/cthulhu.jpg');
  const dogDuck = new OddProduct('dog-duck', 'img/dog-duck.jpg');
  const dragon = new OddProduct('dragon', 'img/dragon.jpg');
  const pen = new OddProduct('pen', 'img/pen.jpg');
  const petSweep = new OddProduct('pet-sweep', 'img/pet-sweep.jpg');
  const scissors = new OddProduct('scissors', 'img/scissors.jpg');
  const shark = new OddProduct('shark', 'img/shark.jpg');
  const sweep = new OddProduct('sweep', 'img/sweep.png');
  const tauntaun = new OddProduct('tauntaun', 'img/tauntaun.jpg');
  const unicorn = new OddProduct('unicorn', 'img/unicorn.jpg');
  const waterCan = new OddProduct('water-can', 'img/water-can.jpg');
  const wineGlass = new OddProduct('wine-glass', 'img/wine-glass.jpg');

  function generateProducts() {
    let oldProducts = chosenProducts.slice();

    if(container.childNodes.length > 1) {
      container.innerHTML = '';
      chosenProducts.splice(0, chosenProducts.length);
    }
    
    for(let i = 0; i < imagesToDisplay; i++) {
      const randomNumber = Math.floor(Math.random() * OddProduct.objectList.length);
      let randomProduct = OddProduct.objectList[randomNumber];

      if (chosenProducts.includes(randomProduct) || oldProducts.includes(randomProduct)) {
        i--;
      } else {
        chosenProducts.push(randomProduct);

        let product = document.createElement('img');
        product.src = randomProduct.path;
        product.id = i;
        container.appendChild(product); 

        randomProduct.incrementViews();
      }
    }
  }

  function productClick(event) {
    if(rounds > 1) {
      let chosenProduct = chosenProducts[event.srcElement.id];
      chosenProduct.incrementClicks();
      
      rounds--;

      generateProducts();
    } else {
      container.removeEventListener('click', productClick);
      container.innerHTML = '';

      let resultsBtn = document.createElement('button');
      resultsBtn.textContent = 'View Results';
      resultsContainer.appendChild(resultsBtn);
      resultsBtn.addEventListener('click', resultsClick);
    }
  }

  function resultsClick(event) {
    // Remove the button
    resultsContainer.removeChild(resultsContainer.lastChild);

    // Create results list and add it to the container
    let resultsList = document.createElement('ul');
    resultsContainer.appendChild(resultsList);

    // Initialize chart labels and data
    let chartLabels = [];
    let votesData = [];
    let viewedData = [];

    for(let product in OddProduct.objectList) {
      // Generate results list items and add them to the list
      product = OddProduct.objectList[product];
      let resultListItem = document.createElement('li');
      resultListItem.textContent = product.name + ' had ' + product.timesClicked + ' votes, and was seen ' + product.timesShown + ' times.';
      resultsList.appendChild(resultListItem);

      // Populate chart labels and data
      chartLabels.push(product.name);
      votesData.push(product.timesClicked);
      viewedData.push(product.timesShown);
    }

    // Chart Code
    const resultsCtx = document.getElementById('resultsChart');

    new Chart(resultsCtx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Votes',
          data: votesData
        }, {
          label: 'Views',
          data: viewedData
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  generateProducts();

  container.addEventListener('click', productClick);
}
