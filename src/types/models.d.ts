interface IRole {
  name: string;
  slug: string;
}

interface IUser {
  name: string;
  surname: string;
  username: string;
  gender: 'male' | 'female';
  role?: IRole;
}

interface IEvaluationUser extends IUser {
  returned: Date | null;
  note: number | null;
  status: 'waiting' | 'done' | 'todo';
}

interface IEvaluation {
  title: string;
  description: string;
  deadline: Date;
  group: {
    name: string;
    slug: string;
  };
  owner: IUser;
}

interface IProfessorEvaluation extends IEvaluation {
  totalUsers: number;
  completedUsers: number;
  users: IEvaluationUser[];
  maxNote: numbers;
}

interface IStudentEvaluation extends IEvaluation {
  infos: IEvaluationUser;
}
