import React from 'react';
import { Container, Title } from './styles';
import { IoPlanetOutline, IoRocketOutline } from 'react-icons/io5';
import { GiMountains } from 'react-icons/gi';

const data = [
  { text: 'ESPAÇO', sub: 'CONHECIMENTO', icon: IoRocketOutline },
  { text: 'PLANETA', sub: 'PROJETOS', icon: IoPlanetOutline },
  { text: 'SUPERFÍCIE', sub: 'BIBLIOGRAFIA/CONTATO', icon: GiMountains },
];

export default ({ onClick, opacity }) => {
  return (
    <Container style={{ opacity: opacity }}>
      {data.map((data, index) => {
        return (
          <Title key={index} onClick={() => onClick(index)}>
            <div>
              <data.icon className="icon" />
              <div>
                <span className="title">{data.text}</span>
                <span className="subtitle">{data.sub}</span>
              </div>
            </div>
          </Title>
        );
      })}
    </Container>
  );
};
