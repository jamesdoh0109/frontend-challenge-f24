export type Course = {
  id: number;
  dept: string;
  number: number;
  title: string;
  description: string;
  prereqs: string[];
  crossListed: string[];
  tags: string[];
};
