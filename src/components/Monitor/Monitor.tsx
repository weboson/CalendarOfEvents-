// show from above: current date (exemple: November 30 (from Month), 2023 (from Year))
import { FC } from 'react';
import {
  DivWrapper,
  TextWrapper,
  TitleWrapper,
  ButtonsWrapper,
  ButtonWrapper,
  TodayButton,
  IMonitorProps,
} from '../Monitor/stylesMonitor/sc_Monitor';
import { useAppSelector } from '../../store/hooks';
import { modesMonitor } from '../../data/modesMonitor';

const Monitor: FC<IMonitorProps> = ({
  currentDate,
  prevHandler,
  todayHandler,
  nextHandler,
}) => {
  // для режима отображения: November 2023 (Month) или 2023 (Year)
  const index = useAppSelector((state) => state.menu);

  const mode = modesMonitor[index].title; // 'month' (режим отображения заголовка в Monitor: Month)
  console.log(modesMonitor[index].title)

  return (
    <DivWrapper>
      {mode == 'month' ? (
        <div>
          <TitleWrapper>{currentDate.format('MMMM')}</TitleWrapper>
          <TextWrapper>{currentDate.format('YYYY')}</TextWrapper>
        </div>
      ) : mode == 'year' ? (
        <div>
          <TitleWrapper>{currentDate.format('YYYY')}</TitleWrapper>
        </div>
      ) : (
        'Заголовок (Monitor.tsx)'
      )}
      <ButtonsWrapper>
        <ButtonWrapper onClick={prevHandler}> &lt; </ButtonWrapper>
        <TodayButton onClick={todayHandler}>Today</TodayButton>
        <ButtonWrapper onClick={nextHandler}> &gt; </ButtonWrapper>
      </ButtonsWrapper>
    </DivWrapper>
  );
};

export default Monitor;
