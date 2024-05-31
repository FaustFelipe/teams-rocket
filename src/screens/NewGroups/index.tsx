import { Header } from '@components/Header';
import { Hightlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Container, Content, Icon } from './styles';
import { Input } from '@components/Input';

export function NewGroup() {
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
                />
                <Button
                    title='Criar turma'
                    style={{ marginTop: 20 }} />
            </Content>
        </Container>
    )
}