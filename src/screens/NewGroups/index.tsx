import { useState } from 'react';
import { Container, Content, Icon } from './styles';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Hightlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { groupCreate } from '@storage/group/groupCreate';

export function NewGroup() {

    const [group, setGroup] = useState('')
    const navigation = useNavigation();

    async function handleNewGroup() {
        try {
            await groupCreate(group);
            navigation.navigate('players', { group });
        } catch (error) {
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