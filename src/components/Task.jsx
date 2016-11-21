import React from 'react';
import styled from 'styled-components';

const TaskStyles = styled.li`
  padding: 10px 5px;
  border-bottom: 1px solid black;
  &:last-child {
    border: none;
  }
`;

export default ({title}) => {
  return (
    <TaskStyles>{title}</TaskStyles>
  );
};