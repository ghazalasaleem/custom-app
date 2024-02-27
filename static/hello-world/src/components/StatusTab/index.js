import React from 'react';
import styled from 'styled-components';
import { STATUS_LIST } from '../../utils/constants';

const Wrapper = styled.div`
display: flex;
gap: 12px;
align-items: center;
margin-left: 8px;
`;

const StatusWrapper = styled.div`
display: flex;
align-items: center;
gap: 5px;
`;

const StatusIcon = styled.div`
width: 26px;
height: 12px;
border-radius: 25px;
`;

const StatusLabel = styled.div`
font-family: Inter;
font-size: 14px;
font-weight: 600;
line-height: 17px;
letter-spacing: 0em;
text-align: left;
`;

const StatusTag = ({ data }) => {
  const {
    name,
    customStyle,
  } = data;

  return (
    <StatusWrapper>
      <StatusIcon style={customStyle} >

      </StatusIcon>
      <StatusLabel>
        {name}
      </StatusLabel>
    </StatusWrapper>
  );
};

export const StatusTab = () => {
  return (
    <Wrapper>
      {STATUS_LIST.map((stat) => <StatusTag key={stat.name} data={stat} /> )}
    </Wrapper>
  );
};