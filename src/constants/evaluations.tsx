import { lukas, robinson, rose, john } from './users';

const subject1 = `Un élève a obtenu une note N. Afficher:  
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

\`\`\``;

const subject2 = `Un magasin de reprographie facture par pièce 0,10 € les dix premières photocopies ;0,09 € les vingt suivantes et 0,08 € au-delà  
Demander à l'utilisateur le nombre de photocopies effectuées et afficher la facture correspondante.  
Exemple de facture :
\`\`\`plaintext
Nb de photocopie    cout unitaire    HT
10                  0.10             1
5                   0.09             0.45

Total HT                             1.45
Total TTC           20%              1.74 €
\`\`\``;

const subject3 = `- Écrire un programme qui affiche les entiers pairs de 0 à 20  
- Écrire un programme qui affiche les entiers impairs de 20 à 0`;

const answer1 = `"""
Programme principal
On demande les nombres minimums et maximums puis on affiche les carrés des nombres compris
entre eux.
"""
def main():
  min_user_input = int(input('Entrez un entier : '))
  max_user_input = int(input('Entrez un entier plus grand : '))

  # Si le nombre le plus petit est plus grand que le plus grand, on affiche une
  # erreur et on quitte le programme
  if min_user_input >= max_user_input:
    print('Ce n\\'est pas un entier plus grand !')
    return
  
  # Affiche les carrés
  # On ajoute un car la boucle va jusqu'à n - 1
  for i in range(min_user_input, max_user_input + 1):
    print(i ** 2, endl="")   


"""
On exécute le programme principal
"""
main()`;

const remark1 = 'Programme pertinent. Vous pourriez utiliser un peu plus de commentaires.';

export const professorEvaluations: Array<IProfessorEvaluation> = [
  {
    title: 'Afficher la note',
    description: subject1,
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
        answer: null,
        cleanlinessNote: null,
        elementUsageNote: null,
        unitTestNote: null,
        remark: null,
      },
      {
        ...robinson,
        returned: new Date(2021, 9, 11, 6, 25),
        note: 15,
        status: 'done',
        answer: null,
        cleanlinessNote: null,
        elementUsageNote: null,
        unitTestNote: null,
        remark: null,
      },
      {
        ...rose,
        returned: null,
        note: null,
        status: 'waiting',
        answer: null,
        cleanlinessNote: null,
        elementUsageNote: null,
        unitTestNote: null,
        remark: null,
      },
    ],
  },
  {
    title: 'Faire une facture',
    description: subject2,
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
        answer: null,
        cleanlinessNote: null,
        elementUsageNote: null,
        unitTestNote: null,
        remark: null,
      },
      {
        ...robinson,
        returned: new Date(2021, 9, 11, 6, 25),
        note: 15,
        status: 'done',
        answer: null,
        cleanlinessNote: null,
        elementUsageNote: null,
        unitTestNote: null,
        remark: null,
      },
      {
        ...rose,
        returned: null,
        note: null,
        status: 'waiting',
        answer: null,
        cleanlinessNote: null,
        elementUsageNote: null,
        unitTestNote: null,
        remark: null,
      },
    ],
  },
  {
    title: 'Afficher les entiers ',
    description: subject3,
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
        answer: null,
        cleanlinessNote: null,
        elementUsageNote: null,
        unitTestNote: null,
        remark: null,
      },
      {
        ...robinson,
        returned: new Date(2021, 9, 11, 6, 25),
        note: 15,
        status: 'done',
        answer: null,
        cleanlinessNote: null,
        elementUsageNote: null,
        unitTestNote: null,
        remark: null,
      },
      {
        ...rose,
        returned: null,
        note: null,
        status: 'waiting',
        answer: null,
        cleanlinessNote: null,
        elementUsageNote: null,
        unitTestNote: null,
        remark: null,
      },
    ],
  },
];

export const studentEvaluations: Array<IStudentEvaluation> = [
  {
    title: 'Afficher la note',
    description: subject1,
    deadline: new Date(2021, 9, 13),
    group: {
      name: 'NSI Terminale',
      slug: 'nsi-terminale',
    },
    owner: john,
    infos: {
      ...lukas,
      returned: new Date(2021, 9, 11, 15, 30),
      note: 15,
      status: 'done',
      cleanlinessNote: 1,
      elementUsageNote: 2,
      unitTestNote: 5,
      answer: answer1,
      remark: remark1,
    },
  },
  {
    title: 'Faire une facture',
    description: subject2,
    deadline: new Date(2021, 9, 20),
    group: {
      name: 'NSI Terminale',
      slug: 'nsi-terminale',
    },
    owner: john,
    infos: {
      ...lukas,
      returned: null,
      note: null,
      status: 'waiting',
      answer: null,
      cleanlinessNote: null,
      elementUsageNote: null,
      unitTestNote: null,
      remark: null,
    },
  },
  {
    title: 'Afficher les entiers ',
    description: subject3,
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
      cleanlinessNote: null,
      elementUsageNote: null,
      unitTestNote: null,
      answer: answer1,
      remark: null,
    },
  },
];

export default professorEvaluations;
