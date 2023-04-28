import React, { useEffect, useState } from 'react';
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

export default React.forwardRef((props, ref) => {
  const [modalSettings, setModalSettings] = useState({
    isVisible: false,
    name: '',
    developTime: '',
    knowledgeLevel: '',
    description: '',
  });

  const handleSetModal = () => {
    const selected = ref.current.tools.selected;
    if (!isNaN(selected)) {
      setModalSettings({ isVisible: true, ...ref.current.tools.data[selected] });
    }
  };

  const handleExitPress = () => {
    ref.current.tools.selected = null;
    //Resets the camera so that it goes back to its original "looking position"
    ref.current.cameraSettings.lookingAt = null;
    setModalSettings({ ...modalSettings, isVisible: false });
  };

  useEffect(() => {
    ref.current.others.setModal = handleSetModal;
  }, []);

  return modalSettings.isVisible ? (
    <Container>
      <div style={{ display: 'flex', width: '100%', flex: 1.5 }}>
        <div style={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
          <Title>{modalSettings.name}</Title>
          <Subtitle>Tempo: {modalSettings.developTime}</Subtitle>
          <Subtitle>Nível: {modalSettings.knowledgeLevel}</Subtitle>
        </div>
        <LevelCountContainer>
          <LevelCountPart style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
          <LevelCountPart style={{ borderRadius: 0 }} />
          <LevelCountPart style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
        </LevelCountContainer>
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <Line style={{ marginTop: 15 }} />
      </div>
      <TextContainer>
        <div style={{ height: '100%' }}>
          <Text>{modalSettings.description}</Text>
        </div>
      </TextContainer>
      <ButtonContainer>
        <Button text={'ENTENDIDO'} onPress={handleExitPress} />
      </ButtonContainer>
    </Container>
  ) : null;
});
