import { FC } from 'react';
import {DivWrapper, TextWrapper, TitleWrapper, ButtonsWrapper, ButtonWrapper, TodayButton, IMonitorProps} from "../Monitor/stylesMonitor/sc_Monitor"



const Monitor: FC<IMonitorProps> = ({currentData, prevHandler, todayHandler, nextHandler}) => {


  return (
    <DivWrapper>
      <div>
        <TitleWrapper>{currentData.format('MMMM')}</TitleWrapper>
        <TextWrapper>{currentData.format('YYYY')}</TextWrapper>
      </div>
      <ButtonsWrapper>

        <ButtonWrapper onClick={prevHandler}> &lt; </ButtonWrapper>
        <TodayButton onClick={todayHandler}>Today</TodayButton>
        <ButtonWrapper onClick={nextHandler}> &gt; </ButtonWrapper>

      </ButtonsWrapper>
    </DivWrapper>
  );
};

export default Monitor;
