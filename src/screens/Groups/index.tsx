import { Hightlight } from '@components/Highlight';
import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { Container } from './styles';

export function Groups() {
  return (
    <Container>
      <Header />
      <Hightlight title={'Turmas'} subtitle={'Jogue com a sua turma'} />

      <GroupCard title={'Turma 1'} />
    </Container>
  );
}
