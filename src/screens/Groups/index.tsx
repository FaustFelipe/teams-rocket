import { useState } from 'react';
import { FlatList } from 'react-native';

import { Hightlight } from '@components/Highlight';
import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { Container } from './styles';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

export function Groups() {
  const [groups, setGroups] = useState([]);

  return (
    <Container>
      <Header />
      <Hightlight title={'Turmas'} subtitle={'Jogue com a sua turma'} />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard title={item} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <EmptyList message={'Nenhuma turma encontrada'} />}
      />

      <Button title={'Criar turma'} />
    </Container>
  );
}
