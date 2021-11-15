export const getPathFromRole = (role: string): string => {
  switch (role) {
    case 'enseignant':
      return '/professor';
    case 'etudiant':
      return '/student';
    case 'administrateur':
      return '/admin';
    default:
      return '/';
  }
};

const n = null;
export default n;
