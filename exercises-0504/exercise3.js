const people = [
    {name: "Mario", occupation: "Developer"},
    {name: "Luigi", occupation: "Designer"},
    {name: "Giulia", occupation: "Architect"}
  ];

  /*Una Promessa rappresenta un valore che viene letteralmente promesso, facendo in modo 
  che il suo valore venga momentaneamente lasciato in attesa. Può essere atteso internamente (usando then)
  oppure usando un timeout
  
  */

  
  function getKey(data) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(data);
      if (keys.length > 0) {
        resolve(keys[0]); // Resolve with the first key
      } else {
        reject("The object has no keys."); // Reject if no keys are found
      }
    });
  }
  
  // Loop through 'people' and call getKey on each object
  people.forEach(person => {
    getKey(person)
      .then(key => console.log(`The first key of the object is "${key}".`))
      .catch(error => console.error(error));
  });
  