import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { Container } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Hightlight } from '@components/Highlight';
import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';
import { groupsGetAll } from '@storage/group/groupsGetAll';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />
      <Hightlight title={'Turmas'} subtitle={'Jogue com a sua turma'} />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
            onPress={() => handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={[{ paddingBottom: 100 }, groups.length === 0 && { flex: 1 }]}
        ListEmptyComponent={() => <EmptyList message={'Nenhuma turma encontrada'} />}
      />

      <Button 
        title={'Criar turma'} 
        onPress={handleNewGroup}
      />
    </Container>
  );
}
