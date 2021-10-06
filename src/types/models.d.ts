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
  totalUsers: number;
  completedUsers: number;
  maxNote: numbers;
  group: {
    name: string;
    slug: string;
  };
  users: IEvaluationUser[];
}
