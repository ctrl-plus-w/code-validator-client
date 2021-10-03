interface IEvaluation {
  title: string;
  description: string;
  deadline: Date;
  totalUsers: number;
  completedUsers: number;
  group: {
    name: string;
    slug: string;
  };
}
