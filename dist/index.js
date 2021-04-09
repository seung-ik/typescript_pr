class Human {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
const ik = new Human("tmddlr", 27, 'male');
function introduce(obj) {
    let long = `hi my name is ${obj.name} i have 5 ${obj.age} and i am very rich so becasue when i was young i wanna ${obj.gender}`;
    console.log(long);
}
introduce(ik);
//# sourceMappingURL=index.js.map