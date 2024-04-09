const student = {
    firstName: "Giovanna",
    lastName : "Rossi",
    id       : 756565,
    fullName : function() {
        return this.firstName + " " + this.lastName;
    }
};

console.log(student.fullName())
//Esercizio: 
//scrivere il metodo dell'oggetto student per recuperare le iniziali 
console.log(student.initials())