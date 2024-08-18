//! Наименования (список) имеющегося у user графика (MealscheduleList)
import { FC, useEffect, useState } from 'react';
import {
  Curve,
  IconsWrapper,
  ListWrappeer,
  NotFoundWrapper,
  Section,
  SectionsWrapper,
  stylesMoon,
  stylesSun,
} from './sc_Mealschedule';
import { MealScheduleService } from '../../services/mealschedule.service';
import { useAppDispatch } from '../../store/hooks';
import { readingIndexSubMenu } from '../../store/features/indexSubMenuSlice';
import { Button } from '@mui/material';
import { GoSun } from 'react-icons/go';
import { BsMoon } from 'react-icons/bs';
import { MdOutlineDinnerDining, MdOutlineFreeBreakfast } from 'react-icons/md';

const MealscheduleList: FC = () => {
  // если нет графика, будет кнопка для перехода на 'Add new'
  const dispatch = useAppDispatch();
  const handleClick = (index: number) => {
    //* записал активную кнопку меню в хранилище, используется в modesDateSlice.ts
    sessionStorage.setItem('indexSubMenu', index.toString()); // например, если нажать на кнопку "New Add", то после обновления страницы, будет режим "RecipesForm.tsx"
    // redux-toolkit
    dispatch(readingIndexSubMenu(index));
    // console.log()
  };
  // получим созданную в форме id графика
  const id = localStorage.getItem('idMealschedules');
  // console.log(id)
  //! пустые данные
  const [data, setData] = useState({});

  const getMealSchedule = async () => {
    const response = await MealScheduleService.getOne(id);
    // console.log(data);
    //! присавивание данных полученных с сервера 
    setData(response);
    return data;
  };
  useEffect(() => {
    getMealSchedule();
  }, []);

  return (
    <ListWrappeer>
      {data.id ? (
        //! если нет графиков
        <>
        <h1>Список Ваших графиков приёма пищи: id: {data.id}</h1>
        <SectionsWrapper>
          <Section>
            <>
              <h2>
                <ruby>
                  В будни:<rt>weekday</rt>
                </ruby>
              </h2>
              <IconsWrapper>
                <GoSun size="40px" style={stylesSun} />
                <MdOutlineFreeBreakfast size="40px" style={stylesSun}/>
                <Curve /> 
                <MdOutlineDinnerDining  size="40px" style={stylesMoon} />
                <BsMoon size="40px" style={stylesMoon} />
              </IconsWrapper>
              <IconsWrapper>
                <span>{data.weekday[0]}:00</span>
                <span>{data.weekday[1]}:00</span>
              </IconsWrapper>

              <IconsWrapper>
                <p>Первый <br/>приём пищи</p>
                <p>Последний <br/>приём пищи</p>
              </IconsWrapper>
            </>
          </Section>

          <Section>
            <>
              <h2>
                <ruby>
                  В выходные:<rt>weekend</rt>
                </ruby>
              </h2>
              <IconsWrapper>
                <GoSun size="40px" style={stylesSun} />
                <MdOutlineFreeBreakfast size="40px" style={stylesSun}/>
                <Curve /> 
                <MdOutlineDinnerDining  size="40px" style={stylesMoon} />
                <BsMoon size="40px" style={stylesMoon} />
              </IconsWrapper>
              <IconsWrapper>
                <span>{data.weekend[0]}:00</span>
                <span>{data.weekend[1]}:00</span>
              </IconsWrapper>

              <IconsWrapper>
                <p>Первый <br/>приём пищи</p>
                <p>Последний <br/>приём пищи</p>
              </IconsWrapper>
            </>
          </Section>
        </SectionsWrapper>
        </>
        
      ) : (
        <NotFoundWrapper>
          <h1>У Вас пока, нет графиков. Создайте их.</h1>
          <img src="/public/images/undefuned_data.jpg" alt="" />
          <Button
            sx={{ margin: '30px' }}
            variant="contained"
            onClick={() => handleClick(0)}
          >
            Создать график
          </Button>
        </NotFoundWrapper>
      )}
    </ListWrappeer>
  );
};

export default MealscheduleList;
