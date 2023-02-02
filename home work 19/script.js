class Human {
  constructor(info) {
    this.name = info.name;
    this.surname = info.surname;
    this.age = info.age;
  }
  getFullName() {
    return `${this.name} ${this.surname}`;
  }
  setFullName(fullName) {
    const [name, surname] = fullName.split(" ");
    this.name = name;
    this.surname = surname;
  }
}

class Student extends Human {
  constructor({ name, surname, age, mark }) {
    super({ name, surname, age });
    this.mark = mark;
  }
  getAverageMark() {
    return this.mark.reduce((a, b) => a + b) / this.mark.length;
  }
  getMaxMark() {
    return Math.max(...this.mark);
  }
  getMinMark() {
    return Math.min(...this.mark);
  }
}

class FakeStudent extends Student {
  #chetedMarks = this.#cheat();
  #cheat() {
    return this.mark.map((mark) => (mark * 2 <= 10 ? mark * 2 : 10));
  }
  constructor({ name, surname, age, mark }) {
    super({ name, surname, age, mark });
  }
  getAverageMark() {
    return this.#chetedMarks.reduce((a, b) => a + b) / this.#chetedMarks.length;
  }
  getMinMark() {
    return Math.min(...this.#chetedMarks);
  }
  getMaxMark() {
    return Math.max(...this.#chetedMarks);
  }
}

let group = [
  Tom = new Student({ name: 'Tom', surname: 'Potter', age: '22', mark: [7, 7, 8, 9, 4] }),
  Ben = new Student({ name: 'Ban', surname: 'Hotter', age: '23', mark: [6, 8, 7, 5, 9] }),
  Fox = new Student({ name: 'Fox', surname: 'Soland', age: '24', mark: [8, 8, 5, 7, 8] }),
  Joe = new Student({ name: 'Joe', surname: 'Xoland', age: '25', mark: [2, 4, 6, 3, 7] }),
  Sam = new Student({ name: 'Sam', surname: 'Roland', age: '26', mark: [9, 9, 9, 9, 9] }),
  Pem = new FakeStudent({ name: 'Pem', surname: 'olo', age: '25', mark: [5, 9, 7, 8, 5] })
]

class Teacher extends Human {
  constructor({ name, surname, age, group }) {
    super({ name, surname, age });
    this.group = group;
  }
  getListOfNamesByAverageMark() {
    let arr = this.group.sort((a, b) => b.getAverageMark() - a.getAverageMark()).map((student) => student.getFullName());
    return arr;
  }
  getStudentByName(name) {
    return this.group.find((item) => item.name === name);
  }
  removeStudentByName(name) {
    let index = this.group.findIndex((student) => student.name === name);
    this.group.splice(index, 1);
  }
  updateStudentByName(student, name) {
    let studentIndex = this.group.findIndex((student) => student.name === name);
    this.group.splice(studentIndex, 1, student);
    return student;
  }
  findFakeStudent() {
    let fakeStudent = this.group.find((student) => student instanceof FakeStudent);
    return `The fake student is ${fakeStudent.getFullName()} and their original marks are ${fakeStudent.mark}`;
  }
}

let Steve = new Teacher({name: 'Steve ', surname: 'Jobs', age: 30, group: group});

console.log(Tom);
console.log("high mark: " + Tom.getMaxMark());
console.log("low mark: " + Tom.getMinMark());
console.log("average mark: " + Tom.getAverageMark());
console.log(Steve);
console.log(Steve.getListOfNamesByAverageMark());
console.log(Steve.updateStudentByName(new Student({name: 'Max', surname: 'London', age: 19, mark: [6, 8, 7, 5, 9]}), 'Sam'))
console.log(Pem);
console.log(Steve.findFakeStudent());