import React from 'react';
import { GoWorkflow } from "react-icons/go";
import { Tag } from 'antd';
import styled from 'styled-components';

export const INBOUND = "INBOUND";
export const OUTBOUND = "OUTBOUND";

export const StyledTag = styled(Tag)`
border-radius: 25px;
padding: 2px 10px;
`;

export const CustomTag = ({ type,
  children }) => {
    const color = type === INBOUND ? "grey" : "orange";

  return <StyledTag color={color}><GoWorkflow /> {children || 'In - bound Dependency'}</StyledTag>;
};