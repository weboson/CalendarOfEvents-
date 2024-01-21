// styled for Monitor.tsx

import { Moment } from "moment";
import styled from "styled-components";


// ts тип для пропс
export interface IMonitorProps {
    currentDate: Moment
    prevHandler: () => void
    todayHandler: () => void
    nextHandler: () => void
  }

export const DivWrapper = styled('div')`
    display: flex;
    min-width: 300px;
    justify-content: space-between;
    background-color: #1e1f21;
    color: #DCDDDD;
    padding: 15px;
`

export const TextWrapper = styled('span')`
    font-size: 32px;
`;
// наследование в styled-components
export const TitleWrapper = styled(TextWrapper)`
    font-weight: bold;
    margin-right: 8px;
`
export const ButtonsWrapper = styled('div')`
    display: flex;
    align-items: center;
`
export const ButtonWrapper = styled('button')`
    border: unset;
    background-color: #565759;
    height: 20px;
    margin-right: 2px;
    border-radius: 4px;
    color: #E6E6E6;
    cursor: pointer;
`
export const TodayButton = styled(ButtonWrapper)`
    padding-right: 16px;
    padding-left: 16px;
    font-weight: bold;
    cursor: pointer;
`;
