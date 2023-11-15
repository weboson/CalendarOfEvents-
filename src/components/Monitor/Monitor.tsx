import { FC } from 'react';
import styled from 'styled-components';

const DivWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    background-color: #1e1f21;
    color: #DCDDDD;
    padding: 16px;
`;

const TextWrapper = styled('span')`
    font-size: 32px;
`;
// наследование в styled-components
const TitleWrapper = styled(TextWrapper)`
    font-weight: bold;
    margin-right: 8px;
`
const ButtonWrapper = styled('button')`
    border: unset;
    background-color: #565759;
    height: 20px;
    margin-right: 2px;
    border-radius: 4px;
    color: #E6E6E6;
`
const TodayButton = styled(ButtonWrapper)`
    padding-right: 16px;
    padding-left: 16px;
    font-weight: bold;
`;

const Monitor: FC = () => {
  return (
    <DivWrapper>
      <div>
        <TitleWrapper>Novemder</TitleWrapper>
        <TextWrapper>2023</TextWrapper>
      </div>
      <div>
        <ButtonWrapper> &lt; </ButtonWrapper>
        <TodayButton>Today</TodayButton>
        <ButtonWrapper> &gt; </ButtonWrapper>
      </div>
    </DivWrapper>
  );
};

export default Monitor;
