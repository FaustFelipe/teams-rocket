import { Container, Logo, BackButton, BackIcon, BackButtonSpace } from './styles';

import { useNavigation } from '@react-navigation/native';

import imgLogo from '@assets/logo.png';

type Props = {
    showBackButton?: boolean;
}

export function Header({ showBackButton = false }: Props) {

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.navigate('groups');
    }

    return (
        <Container>
            {
                showBackButton &&
                <>
                    <BackButton onPress={handleGoBack}>
                        <BackIcon />
                    </BackButton>
                    <BackButtonSpace />
                </>
            }
            <Logo source={imgLogo} />
        </Container>
    )
}