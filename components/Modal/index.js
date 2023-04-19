import React from 'react';
import {
  ButtonContainer,
  Container,
  LevelCountContainer,
  LevelCountPart,
  Line,
  Subtitle,
  Text,
  TextContainer,
  Title,
} from './styles';
import Button from '../Button';

export default () => {
  return (
    <Container>
      <div style={{ flex: 2, width: '100%', display: 'flex' }}>
        <div style={{ height: '100%', width: '80%' }}>
          <Title>LOREM IPSUM</Title>
          <Subtitle>Tempo: 3-4 meses</Subtitle>
          <Subtitle>Nível: baixo</Subtitle>
        </div>
        <LevelCountContainer>
          <LevelCountPart style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
          <LevelCountPart style={{ borderRadius: 0 }} />
          <LevelCountPart style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
        </LevelCountContainer>
      </div>
      <div style={{ flex: 1 }}>
        <Line style={{ marginTop: 15 }} />
      </div>
      <TextContainer>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel tristique arcu.
          Proin accumsan mauris sed velit maximus condimentum. Morbi dapibus metus a tellus
          vehicula, pretium finibus sapien vulputate. Maecenas condimentum pretium pellentesque.
          Suspendisse potenti. Vestibulum tempor ante auctor ex varius, mattis sagittis ex congue.
          Pellentesque iaculis vestibulum enim et aliquam. Sed rutrum accumsan ultricies.
        </Text>
      </TextContainer>
      <ButtonContainer>
        <Button />
      </ButtonContainer>
    </Container>
  );
};
