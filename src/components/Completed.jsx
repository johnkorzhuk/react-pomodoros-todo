import React from 'react';
import styled from 'styled-components';

const CompletedStyles = styled.ul`
  padding: 0;
  background-color: #e3e3e3;
  list-style: none;
`;

export default ({children}) => {
  return (
    <CompletedStyles>
      {children}
    </CompletedStyles>
  )
};