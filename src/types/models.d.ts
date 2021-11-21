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
  slug: string;
  subject: string;
  deadline: Date;
  group: {
    name: string;
    slug: string;
  };
  user: IUser;
}

interface IAnswer {
  id: Int;
  user: IUser;
  content?: string;
  note?: string;
  cleanliness?: number;
  unitTests?: number;
  elementUsage?: number;
  evaluation?: IEvaluation;
  corrected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IProfessorEvaluation extends IEvaluation {
  totalUsers: number;
  completedUsers: number;
  answers?: IAnswer[];
}

interface IStudentEvaluation extends IEvaluation {
  infos: IEvaluationUser;
}

interface IGroup {
  id: number;
  name: string;
  slug: string;

  users?: IUser[];

  createdAt: Date;
  updatedAt: Date;
}
