export interface Attempt {
  id: number;
  // title: string;
  date: Date;
  performanceCategory: string;
  timeTaken: number; // minutes
}

export interface Question {
  id: number;
  title: string;
  attempts: Attempt[];
  time: number; // minutes
}

export interface Category {
  id: number;
  title: string;
  questions: Question[];
}

// export enum Categories {
//   DidNotKnowHowToDo = "Didn't know how to do",
//   NotKnowOptimal = "Didn't know optimal",
//   KnewRanOutOfTimeNotOptimized = 'Knew what to do but ran out of time / non-optimized',
//   KnewRanOutofTime = 'Could solve but ran out of time',
//   FinishedButSlow = 'Finished but a little slow',
//   RepeatToBeSure = 'Finished but do again to solidify',
//   Mastered = 'Finshed comfortably first try',
// }

