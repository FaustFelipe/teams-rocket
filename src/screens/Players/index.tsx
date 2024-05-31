import { useState } from 'react';
import { FlatList } from 'react-native';
import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';
import { Header } from '@components/Header';
import { Hightlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

export function Players() {

    const [team, setTeam] = useState('Time 1')
    const [players, setPlayers] = useState(['Felipe', 'Alexandre'])

    return (
        <Container >
            <Header showBackButton />

            <Hightlight
                title={'Nome da turma'}
                subtitle={'Adicione a galera e separe os times'}
            />
            <Form>
                <Input
                    placeholder='Nome da pessoa'
                    autoCorrect={false}
                />
                <ButtonIcon icon='add' />
            </Form>

            <HeaderList>
                <FlatList
                    data={['Time 1', 'Time 2', 'Time 3', 'Time 4', 'Time 5']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumbersOfPlayers>
                    {players.length}
                </NumbersOfPlayers>
            </HeaderList>

            <FlatList 
                data={players}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard 
                        name={item}
                        onRemove={() => {console.log('remove')}}
                    />
                )}
                ListEmptyComponent={() => (
                    <EmptyList
                        message={'Nenhum jogador encontrado'}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 }
                ]}
            />

            <Button
                title='Remover Turma'
                type='SECONDARY'
            />
        </Container>
    )
}