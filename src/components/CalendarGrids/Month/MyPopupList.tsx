import { FC, memo, useEffect, useState } from 'react';
import recipesMedications, { IRecipesMedications } from '../../../data/localDataBase/LocalDB_WaysUsing';
import { Moment } from 'moment';
import { MyPopupListStyle, MyPopupListStyleLi, WrapperIcon } from './stylesMonthGrid/sc_MonthGrid';
import moment from 'moment';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { useAppDispatch } from '../../../store/hooks';

interface Iprops {
  dayItem: Moment;
  index: number;
}

const MyPopupList: FC<Iprops> = ({dayItem, index}) => {
  // если навести на счетчик, то MyPopupList display: block, если убрать то noneя (но фактически их несколько, с уник id)
  // при наведении на сам Popup - Popup отображается 
  const [popup, setPopup] = useState(false);
 
  return (
    <MyPopupListStyle
      id={`MyPopupList${index}`} //! окна не видимы в каждой ячейке, и уникальыне классы
      style={popup ? { display: 'flex',  animation: '', } : { animation: 'hidden 1s forwards'}}
      onMouseOver={() => setPopup(true)}
      onMouseOut={() => setPopup(false)}
    >
      <h6 style={{lineHeight: '0',}}>Список лекарств:</h6>
      <div>
        {recipesMedications.map(
            (medItem, index) => 
              moment(medItem.start, 'DD.MM.YYYY') <= dayItem &&
              dayItem <
                moment(medItem.start, 'DD.MM.YYYY')
                  .clone()
                  .add(medItem.duration.index, medItem.duration.title) && (
                <MyPopupListStyleLi
                  className=''
                  key={index}
                  style={{display: 'block'}}
                >
                  <RiMedicineBottleLine className={`medElemUnic${medItem.id}`} />
                  <span>{medItem.title}</span>
                </MyPopupListStyleLi>
              ),
          )}
      </div>
    </MyPopupListStyle>
  );
};

export default MyPopupList;
