import { useState } from 'react';

import type { ReactElement } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';

import { ChevronLeftIcon } from '@heroicons/react/solid';

import hljsTheme from '@style/hljs';

import ProfessorLayout from '@layout/ProfessorLayout';

import Container from '@module/Container';

import RateInput from '@element/RateInput';
import Button from '@element/Button';
import Input from '@element/Input';
import Title from '@element/Title';
import Link from '@element/Link';

const Correction = (): ReactElement => {
  const [elementUsage, setElementUsage] = useState(0);
  const [cleanCode, setCleanCode] = useState(0);
  const [note, setNote] = useState('');

  const str = `"""
Programme principal
On demande les nombres minimums et maximums puis on affiche les carrés
des nombres compris
entre eux.
"""
def main():
  min_user_input = int(input('Entrez un entier : '))
  max_user_input = int(input('Entrez un entier plus grand : '))

  # Si le nombre le plus petit est plus grand que le plus grand, on affiche une
  # erreur et on quitte le programme
  if min_user_input <= max_user_input:
    print('Ce n\\'est pas un entier plus grand !')
    return
  
  # Affiche les carrés
  # On ajoute un car la boucle va jusqu'à n - 1
  for i in range(min_user_input, max_user_input + 1):
    print(i ** 2, endl="")   

"""
On exécute le programme principal
"""
main()
`;

  return (
    <ProfessorLayout menu={false} className="flex gap-16">
      <Container className="w-2/5 " fullVertical col>
        <Link href="/professor/evaluations" className="mb-8">
          <ChevronLeftIcon className="w-6 h-6" />
          Quitter le mode&nbsp;<span className="link-keyword">correction</span>
        </Link>

        <Title>John Doe</Title>
        <Title className="mt-2" level={3}>
          Terminale NSI
        </Title>

        <Container className="gap-6 mt-6" col>
          <Container className="gap-12 flex-wrap" fullHorizontal row>
            <RateInput
              value={elementUsage}
              setValue={setElementUsage}
              label="Utilisation des élements"
              name="elements-usage"
              max={5}
            />

            <RateInput
              value={cleanCode}
              setValue={setCleanCode}
              label="Propretée du code"
              name="clean-code"
              max={5}
            />
          </Container>

          <Input
            name="note"
            label="Notes"
            placeholder="Remarques sur le programme"
            value={note}
            setValue={setNote}
            textarea
          />
        </Container>

        <Container className="mt-auto justify-between" fullHorizontal row>
          <Button type="GHOST_PRIMARY">Évalutation précédente</Button>
          <Button type="PRIMARY">Valider</Button>
        </Container>
      </Container>

      <Container className="w-3/5" full>
        <SyntaxHighlighter
          language="python"
          style={hljsTheme}
          customStyle={{
            width: '100%',
            height: '100%',
            padding: '2rem',
            borderRadius: '2px',
          }}
        >
          {str}
        </SyntaxHighlighter>
      </Container>
    </ProfessorLayout>
  );
};

export default Correction;
