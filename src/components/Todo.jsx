import React from 'react';
import styled from 'styled-components';


const TodoStyles = styled.ul`
  background-color: papayawhip;
  list-style: none;
  padding: 0;
`;

export default ({children}) => {
  return (
    <TodoStyles>
      {children}
    </TodoStyles>
  )
};