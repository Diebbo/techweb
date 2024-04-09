function printNumbersSync() {
    for (let i = 1; i <= 5; i++) {
        console.log(i);
        }
    }



function printNumbersAsync() {
    setTimeout(() => {
        console.log(1);
        for (let i = 2; i <= 5; i++) {
        console.log(i);
        }
    }, 10000);
}

printNumbersAsync()
printNumbersSync()

/*è sempre buona pratica gestire le richieste usando funzioni asincrone, in questa maniera possiamo evitare
che una variabile risulti vuota quando i pacchetti relativi alla richiesta non 
siano ancora arrivati. Spesso si tratta di pochi millisecondi*/ 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// Arrow functions don't have their own bindings to this, arguments, or super, and should not be used as methods.
// Arrow functions cannot be used as constructors. Calling them with new throws a TypeError. They also don't have access to the new.target keyword.
// Arrow functions cannot use yield within their body and cannot be created as generator functions.
const promise = fetch('https://jsonplaceholder.typicode.com/todos/1');
    promise
      .then(response => response.json())
      .then(data => 
        console.log(data.title)
    )
      .catch(error => console.error(error));

function printData(data) {
    console.log(data);
  }
  
const events = fetch('https://raw.githubusercontent.com/aschimmenti/techweb-test/main/db.json')
.then(response => response.json())
.then(data => {
    printData(data);
})
.catch(error => console.error('Error fetching data:', error));

