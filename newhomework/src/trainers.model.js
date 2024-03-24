import { v4 as uuid } from "uuid";

export class Trainer {
  id = uuid();
  isCurrentlyTeaching = false;

  constructor(firstName, lastName, email, timeEmployed, coursesFinished) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.timeEmployed = timeEmployed;
    this.coursesFinished = coursesFinished;
  }
}
