window.onload = function() {
  // global variables
  const imagesToDisplay = 3;
  const rounds = 25;

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
      this.incrementClicks++;
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
  const sweep = new OddProduct('sweep', 'img/sweep.jpg');
  const tauntaun = new OddProduct('tauntaun', 'img/tauntaun.jpg');
  const unicorn = new OddProduct('unicorn', 'img/unicorn.jpg');
  const waterCan = new OddProduct('water-can', 'img/water-can.jpg');
  const wineGlass = new OddProduct('wine-glass', 'img/wine-glass.jpg');

  function generateProducts() {
    const chosenProducts = [];
    //TODO: for loop that loops through equal to the value of imagesToDisplay.
    for(let i = 0; i < imagesToDisplay; i++) {
      const randomNumber = Math.floor(Math.random() * 19);
      let randomProduct = OddProduct.objectList[randomNumber];
      //TODO: get the associated product from out objectList[];, Do a check to make sure we haven't already picked this object. If not there, add it to the array. If it's there, minus 1 from i.
      if (chosenProducts.includes(randomProduct)) {
        i--;
        console.log('already there');
      } else {
        chosenProducts.push(randomProduct);
        let product = document.createElement('img');
        product.src = randomProduct.path;
        document.getElementById('productContainer').appendChild(product);
      }
    }
    console.log(chosenProducts);
    
  }
  
  generateProducts();
  // for(let i = 0; i <= rounds; i++) {
  //   generateProducts();
  // }
}
