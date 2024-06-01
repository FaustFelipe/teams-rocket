import { useState } from 'react';
import { Alert } from 'react-native';
import { Container, Content, Icon } from './styles';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Hightlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';

export function NewGroup() {

    const [group, setGroup] = useState('')
    const navigation = useNavigation();

    async function handleNewGroup() {
        try {
            if (group.trim().length === 0) { return; }

            await groupCreate(group);
            navigation.navigate('players', { group });
        } catch (error) {
            handleNewGroupError(error);
        }
    }

    function handleNewGroupError(error: any) {
        if (error instanceof AppError) {
            Alert.alert('Novo Groupo', error.message);
        } else {
            Alert.alert('Novo Groupo', 'Não foi possível criar a turma. Tente novamente');
            console.log(error);
        }
    }

    return (
        <Container >
            <Header showBackButton />
            <Content>
                <Icon />
                <Hightlight
                    title='Nova turma'
                    subtitle='crie a turma para adicionar as pessoas'
                />
                <Input
                    placeholder='Nome da turma'
                    onChangeText={setGroup}
                />
                <Button
                    title='Criar turma'
                    style={{ marginTop: 20 }} 
                    onPress={handleNewGroup}
                />
            </Content>
        </Container>
    )
}