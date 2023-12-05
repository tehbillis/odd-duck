window.onload = function() {
  // global variables
  const imagesToDisplay = 3;
  let rounds = 25;

  const chosenProducts = [];
  let container = document.getElementById('productContainer');
  let resultsContainer = document.getElementById('results');

  // Product Class
  class OddProduct {
    constructor (name, path) {
      this.name = name;
      this.path = path;
      this.timesShown = 0;
      this.timesClicked = 0;
      OddProduct.objectList.push(this);
    }

    static objectList = [];
  }

  // Create objects
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

  // Persist vote data
  if(localStorage.getItem('objectList')) {
    OddProduct.objectList = JSON.parse(localStorage.getItem('objectList'));
  }

  function generateProducts() {
    let oldProducts = chosenProducts.slice();

    // if there are images here, clear them from the page and our variable.
    if(container.childNodes.length > 1) {
      container.innerHTML = '';
      chosenProducts.splice(0, chosenProducts.length);
    }
    
    for(let i = 0; i < imagesToDisplay; i++) {
      const randomNumber = Math.floor(Math.random() * OddProduct.objectList.length);
      let randomProduct = OddProduct.objectList[randomNumber];

      if (chosenProducts.includes(randomProduct) || oldProducts.includes(randomProduct)) {
        // if new random product was chosen this time or last time, don't do anything and try again.
        i--;
      } else {
        // If actually unique, then get it displayed!
        chosenProducts.push(randomProduct);

        let product = document.createElement('img');
        product.src = randomProduct.path;
        product.id = i;
        container.appendChild(product); 

        randomProduct.timesShown++;
      }
    }
  }

  function productClick(event) {
    // Check rounds remaining
    if(rounds > 1) {
      // Let's play! increment clicked object and decrease rounds.
      let chosenProduct = chosenProducts[event.srcElement.id];
      chosenProduct.timesClicked++;
      
      rounds--;

      generateProducts();
    } else {
      // No more play, clear board and move on to results.
      container.removeEventListener('click', productClick);
      container.innerHTML = '';

      handleResults();
    }
  }

  function handleResults() {
    // Create restart button
    let restartBtn = document.createElement('button');
    restartBtn.innerText = 'Vote Again!';
    restartBtn.id = 'restartBtn';
    container.appendChild(restartBtn);

    restartBtn.addEventListener('click', function() {
      // Reload the current page
      location.reload();
    });

    // Initialize chart labels and data
    let chartLabels = [];
    let votesData = [];
    let viewedData = [];

    for(let product in OddProduct.objectList) {
      // Generate results list items and add them to the list
      product = OddProduct.objectList[product];

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

  // Save stats before window is closed or refreshed
  function quickSave() {
    localStorage.setItem('objectList', JSON.stringify(OddProduct.objectList));
  }
  
  generateProducts();

  // Event Listeners
  container.addEventListener('click', productClick);

  window.addEventListener('beforeunload', function() {
    quickSave();
  })
}
