import { Moment } from 'moment';
import { FC, useState } from 'react';
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
const ButtonsWrapper = styled('div')`
    display: flex;
    align-items: center;
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

// ts тип для пропс
export interface IMonitorProps {
    currentDate: Moment
    selectHandler: (string: string) => void
  }


const Monitor: FC<IMonitorProps> = ({currentDate, selectHandler}) => {


  return (
    <DivWrapper>
      <div>
        <TitleWrapper>{currentDate.format('MMMM')}</TitleWrapper>
        <TextWrapper>{currentDate.format('YYYY')}</TextWrapper>
      </div>
      <ButtonsWrapper>

        <ButtonWrapper onClick={() => selectHandler('prev')}> &lt; </ButtonWrapper>
        <TodayButton onClick={() => console.log('sdf')}>Today</TodayButton>
        <ButtonWrapper onClick={() => selectHandler('next')}> &gt; </ButtonWrapper>

      </ButtonsWrapper>
    </DivWrapper>
  );
};

export default Monitor;
