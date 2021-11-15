interface IRole {
  name: string;
  slug: string;
}

interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  gender: 'male' | 'female';
  role?: IRole;
}

interface IEvaluationUser extends IUser {
  returned: Date | null;
  note: number | null;
  status: 'waiting' | 'done' | 'todo';
  answer: string | null;
  elementUsageNote: number | null;
  cleanlinessNote: number | null;
  unitTestNote: number | null;
  remark: string | null;
}

interface IEvaluation {
  title: string;
  subject: string;
  deadline: Date;
  group: {
    name: string;
    slug: string;
  };
  user: IUser;
}

interface IProfessorEvaluation extends IEvaluation {
  totalUsers: number;
  completedUsers: number;
  maxNote: number;
}

interface IStudentEvaluation extends IEvaluation {
  infos: IEvaluationUser;
}
