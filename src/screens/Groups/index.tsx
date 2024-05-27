import { Hightlight } from '@components/Highlight';
import { Header } from '@components/Header';
import { Container } from './styles';

export function Groups() {
  return (
    <Container>
      <Header />
      <Hightlight title={'Turmas'} subtitle={'Jogue com a sua turma'} />
    </Container>
  );
}
