import { lukas, robinson, rose, john } from './users';

export const professorEvaluations: Array<IProfessorEvaluation> = [
  {
    title: 'Afficher la note',
    description: `Un élève a obtenu une note N. Afficher:  
− « Bravo c'est extraordinaire » s'il a obtenu plus de 19  
− « vraiment très bien » si la note est comprise entre 16 et 19  
− « c'est bien » si la note est entre 12 et 16  
− « pas mal » si la note est entre 10 et 12  
− « encore un effort » si la note est comprise entre 8 et 10  
− « du travail est nécessaire » si la note est entre 5 et 8  
− « insuffisant » sinon  
  
\`\`\`python
# Voici la syntaxe de la fonction 
# La fonction doit retourner une chaîne de charactères
# et prends en paramètres un nombre entier

def message_note(nb):
  pass

\`\`\`
   `,
    deadline: new Date(2021, 9, 13),
    totalUsers: 32,
    completedUsers: 32,
    maxNote: 15,
    group: {
      name: 'NSI Terminale',
      slug: 'nsi-terminale',
    },
    owner: john,
    users: [
      {
        ...lukas,
        returned: new Date(2021, 9, 11, 15, 30),
        note: null,
        status: 'todo',
      },
      {
        ...robinson,
        returned: new Date(2021, 9, 11, 6, 25),
        note: 15,
        status: 'done',
      },
      {
        ...rose,
        returned: null,
        note: null,
        status: 'waiting',
      },
    ],
  },
  {
    title: 'Faire une facture',
    description: `Un magasin de reprographie facture par pièce 0,10 € les dix premières photocopies ; 0,09 € les vingt suivantes et 0,08 € au-delà
Demander à l'utilisateur le nombre de photocopies effectuées et afficher la facture correspondante.
Exemple de facture :
Nb de photocopie    cout unitaire    HT
10                  0.10             1
5                   0.09             0.45

Total HT                             1.45
Total TTC           20%              1.74 €`,
    deadline: new Date(2021, 9, 20),
    totalUsers: 32,
    completedUsers: 0,
    maxNote: 15,
    group: {
      name: 'NSI Terminale',
      slug: 'nsi-terminale',
    },
    owner: john,
    users: [
      {
        ...lukas,
        returned: new Date(2021, 9, 11, 15, 30),
        note: null,
        status: 'todo',
      },
      {
        ...robinson,
        returned: new Date(2021, 9, 11, 6, 25),
        note: 15,
        status: 'done',
      },
      {
        ...rose,
        returned: null,
        note: null,
        status: 'waiting',
      },
    ],
  },
  {
    title: 'Afficher les entiers ',
    description: `a) Écrire un programme qui affiche les entiers pairs de 0 à 20
b) Écrire un programme qui affiche les entiers impairs de 20 à 0`,
    deadline: new Date(2021, 9, 17),
    totalUsers: 32,
    completedUsers: 12,
    maxNote: 15,
    group: {
      name: 'NSI Terminale',
      slug: 'nsi-terminale',
    },
    owner: john,
    users: [
      {
        ...lukas,
        returned: new Date(2021, 9, 11, 15, 30),
        note: null,
        status: 'todo',
      },
      {
        ...robinson,
        returned: new Date(2021, 9, 11, 6, 25),
        note: 15,
        status: 'done',
      },
      {
        ...rose,
        returned: null,
        note: null,
        status: 'waiting',
      },
    ],
  },
];

export const studentEvaluations: Array<IStudentEvaluation> = [
  {
    title: 'Afficher la note',
    description: `Un élève a obtenu une note N. Afficher:  
− « Bravo c'est extraordinaire » s'il a obtenu plus de 19  
− « vraiment très bien » si la note est comprise entre 16 et 19  
− « c'est bien » si la note est entre 12 et 16  
− « pas mal » si la note est entre 10 et 12  
− « encore un effort » si la note est comprise entre 8 et 10  
− « du travail est nécessaire » si la note est entre 5 et 8  
− « insuffisant » sinon  
  
\`\`\`python
# Voici la syntaxe de la fonction 
# La fonction doit retourner une chaîne de charactères
# et prends en paramètres un nombre entier

def message_note(nb):
  pass

\`\`\`
   `,
    deadline: new Date(2021, 9, 13),
    group: {
      name: 'NSI Terminale',
      slug: 'nsi-terminale',
    },
    owner: john,
    infos: {
      ...lukas,
      returned: new Date(2021, 9, 11, 15, 30),
      note: null,
      status: 'todo',
    },
  },
  {
    title: 'Faire une facture',
    description: `Un magasin de reprographie facture par pièce 0,10 € les dix premières photocopies ; 0,09 € les vingt suivantes et 0,08 € au-delà
Demander à l'utilisateur le nombre de photocopies effectuées et afficher la facture correspondante.
Exemple de facture :
Nb de photocopie    cout unitaire    HT
10                  0.10             1
5                   0.09             0.45

Total HT                             1.45
Total TTC           20%              1.74 €`,
    deadline: new Date(2021, 9, 20),
    group: {
      name: 'NSI Terminale',
      slug: 'nsi-terminale',
    },
    owner: john,
    infos: {
      ...lukas,
      returned: new Date(2021, 9, 11, 15, 30),
      note: null,
      status: 'todo',
    },
  },
  {
    title: 'Afficher les entiers ',
    description: `a) Écrire un programme qui affiche les entiers pairs de 0 à 20
b) Écrire un programme qui affiche les entiers impairs de 20 à 0`,
    deadline: new Date(2021, 9, 17),
    group: {
      name: 'NSI Terminale',
      slug: 'nsi-terminale',
    },
    owner: john,
    infos: {
      ...lukas,
      returned: new Date(2021, 9, 11, 15, 30),
      note: null,
      status: 'todo',
    },
  },
];

export default professorEvaluations;
