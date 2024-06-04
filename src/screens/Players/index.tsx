import { useState, useEffect, useRef } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';
import { useRoute, useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header';
import { Hightlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { AppError } from '@utils/AppError';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playerGetByGroup } from '@storage/player/playerGetByGroup';
import { playerGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

type RouteParams = {
    group: string;
}

export function Players() {
    const [isLoading, setIsLoading] = useState(true);
    const [newPlayer, setNewPlayer] = useState('');
    const [team, setTeam] = useState('Time 1')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const navigation = useNavigation();
    const route = useRoute();
    const { group } = route.params as RouteParams;

    const newPlayerInputRef = useRef<TextInput>(null);

    async function handleAddNewPlayer() {
        if (newPlayer.trim().length === 0) { return; }

        const player = {
            name: newPlayer,
            team: team
        }

        try {
            await playerAddByGroup(player, group);
            fetchPlayersByTeam();
            setNewPlayer('');
            newPlayerInputRef.current?.blur();
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Novo jogador', error.message);
            } else {
                console.log(error);
                Alert.alert('Novo jogador', 'Não foi possível adicionar o jogador');
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            setIsLoading(true);
            const playersByTeam = await playerGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRemovePlayer(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();
        } catch (error) {
            console.log(error);
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRemoveGroup() {
        Alert.alert(
            'Remover turma',
            'Tem certeza que deseja remover a turma?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Remover',
                    style: 'destructive',
                    onPress: groupRemove
                }
            ]
        );
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team])

    return (
        <Container >
            <Header showBackButton />

            <Hightlight
                title={group}
                subtitle={'Adicione a galera e separe os times'}
            />
            <Form>
                <Input
                    inputRef={newPlayerInputRef}
                    onChangeText={setNewPlayer}
                    placeholder='Nome da pessoa'
                    autoCorrect={false}
                    value={newPlayer}
                    onSubmitEditing={handleAddNewPlayer}
                    returnKeyType='done'
                />
                <ButtonIcon
                    icon='add'
                    onPress={handleAddNewPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['Time 1', 'Time 2']}
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

            {
                isLoading ? <Loading /> :
                    <FlatList
                        data={players}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <PlayerCard
                                name={item.name}
                                onRemove={() => { handleRemovePlayer(item.name) }}
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
            }

            <Button
                title='Remover Turma'
                type='SECONDARY'
                onPress={handleRemoveGroup}
            />
        </Container>
    )
}