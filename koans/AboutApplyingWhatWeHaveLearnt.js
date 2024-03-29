var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _(products).filter(function(product){
        return !product.containsNuts && !_(product.ingredients).any(function(ingredient){
          return ingredient === "mushrooms";
        });
      });

      console.log(productsICanEat);

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    /* try chaining range() and reduce() */
    var sum = _.range(0,1000).filter(function(num){
      return num % 3 === 0 || num % 5 === 0;
    }).reduce(function(memo, num){
      return memo + num;
    }, 0);    

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    _.chain(products)
      .map(function(product){ return product.ingredients; })
      .flatten()
      .reduce(function(list, ingredient) { 
        ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
      })

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  var FILL_ME_IN_TOO = null;

  it("should find the largest prime factor of a composite number", function () {
    
    var largestPrimeFactorOfComposite = function(compositeNum) {

      var isPrime = function(num) {
        for (var i = 2; i < num; i++) {
          if (num % i === 0) {
            return false;
          }
        }
        return true;
      }

      for (var i = compositeNum; i > 1; i--) {
        if (compositeNum % i === 0 && isPrime(i)) {
          return i;
        }
      }

    };
  
    expect(largestPrimeFactorOfComposite(25)).toBe(5);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    //is palindrome function
    var isPalindrome = function(num) {
      var string = num.toString();

      for (var i=0; i<string.length; i++) {
        if (string[i] !== string[string.length - i - 1]) {
          return false;
        }
      }
      return true;
    };

    var largestPalindromeFromTwo3DigitFactors = function(){
      var max = 0;

      for (var i = 100; i < 1000; i++) {
        for (var j = i; j < 1000; j++) {
          var product = i * j;
          if (isPalindrome(product) && product > max) {
            max = product;
          }
        }
      }

      return max;
    }


    expect(largestPalindromeFromTwo3DigitFactors()).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

    var smallestNumberDivisibleByAllTo = function(num) {

      //count up from 20 until found a number that satisfies criteria

      var counter = num;
      var divides;

      while(true) { //while(true) because we don't know when the loop will end beforehand
        divides = true;

        for (var i = 1; i <= num; i++) {
          if (counter % i !== 0) {
            divides = false;
            break; // no need to check following numbers in fails to divide
          }
        }

        if (divides) {
          return counter;
        } else {
          counter++;
        }
      }
    };
    
    expect(smallestNumberDivisibleByAllTo(20)).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var sumOfSquaresVsSquareOfSums = function(num1, num2) {
      return Math.abs((num1*num1 + num2*num2) - (num1+num2)*(num1+num2));
    }
    expect(sumOfSquaresVsSquareOfSums(3, 4)).toBe(24);
  });

  it("should find the 10001st prime", function () {

    var findNthPrime = function(nthPrime) {
      
      var isPrime = function(num) {
        for (var i = 2; i < num; i++) {
          if (num % i === 0) {
            return false;
          }
        }
        return true;
      }

      var primeCounter = 1; 
      var loopCounter = 2; //the number 2 is the first prime

      while (primeCounter < nthPrime) {
        loopCounter++;

        if (isPrime(loopCounter)) {
          primeCounter++;
        }
      }

      return loopCounter;
    };

    expect(findNthPrime(10001)).toBe(104743);
  });
  
});
