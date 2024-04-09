const people = [
    {name: "Mario", age: 30},
    {name: "Luigi", age: 25},
    {name: "Giulia", age: 28}
  ];
  
  function averageAge(people) {
    let sum = 0;
    for (let i = 0; i < people.length; i++) {
      sum += people[i].age;
    }
    return sum / people.length; // Calculate the average age
  }
  
  console.log(averageAge(people)); // Expected result: 27.67
  