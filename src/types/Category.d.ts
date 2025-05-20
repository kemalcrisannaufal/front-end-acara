interface ICategory {
  _id?: string;
  name: string;
  description: string;
  icon?: string | FileList;
  createdAt?: string;
  updatedAt?: string;
}

export { ICategory };
