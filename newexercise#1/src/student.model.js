import { v4 as uuid } from "uuid";

export class Student {
  id = uuid();
  constructor(firstName, lastName, email, gender, city, averageGrade, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
    this.city = city;
    this.averageGrade = averageGrade;
    this.age = age;
  }
}
