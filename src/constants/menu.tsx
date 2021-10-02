interface IMenu {
  [key: string]: {
    baseUrl: string;
    paths: {
      [key: string]: {
        pathname: string;
        title?: string;
      };
    };
  };
}

const MENU: IMenu = {
  student: {
    baseUrl: '/student',
    paths: {
      home: {
        pathname: '/student/home',
        title: 'Accueil',
      },
      evaluations: {
        pathname: '/student/evaluations',
        title: 'Evaluations',
      },
    },
  },
  professor: {
    baseUrl: '/professor',
    paths: {
      home: {
        pathname: '/professor/home',
        title: 'Accueil ',
      },
      evaluations: {
        pathname: '/professor/evaluations',
        title: 'Evaluations',
      },
      createEvaluation: {
        pathname: '/professor/evaluations/create',
      },
    },
  },
};

export default MENU;
