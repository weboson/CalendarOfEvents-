import { FC } from 'react';
import {DivWrapper, TextWrapper, TitleWrapper, ButtonsWrapper, ButtonWrapper, TodayButton, IMonitorProps} from "../Monitor/stylesMonitor/sc_Monitor"



const Monitor: FC<IMonitorProps> = ({today, prevHandler, todayHandler, nextHandler}) => {


  return (
    <DivWrapper>
      <div>
        <TitleWrapper>{today.format('MMMM')}</TitleWrapper>
        <TextWrapper>{today.format('YYYY')}</TextWrapper>
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
