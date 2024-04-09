import { FC, memo, useState } from 'react';
import { IRecipesMedications } from '../../../data/localDataBase/LocalDB_WaysUsing';
import { Moment } from 'moment';
import { MyPopupListStyle, WrapperIcon } from './stylesMonthGrid/sc_MonthGrid';
import moment from 'moment';
import { RiMedicineBottleLine } from 'react-icons/ri';

interface Iprops {
  recipesMedications: IRecipesMedications;
  dayItem: Moment;
}

const MyPopupList: FC<Iprops> = memo(({ recipesMedications, dayItem }) => {
  const [popup, setPopup] = useState(false);


  return (
    <MyPopupListStyle
      id="MyPopupList"
      style={popup ? { display: 'flex',  animation: '', } : { animation: 'hidden 1s forwards'}}
      onMouseOver={() => setPopup(true)}
      onMouseOut={() => setPopup(false)}
    >
      <h6>Список лекарств</h6>
      <div>
        {recipesMedications.map(
          (medItem, index) =>
            moment(medItem.start, 'DD.MM.YYYY') <= dayItem &&
            dayItem <
              moment(medItem.start, 'DD.MM.YYYY')
                .clone()
                .add(medItem.duration.index, medItem.duration.title) && (
              <WrapperIcon
                key={index}
                style={{display: 'block'}}
              >
                <RiMedicineBottleLine className={`medElemUnic${medItem.id}`} />
                {medItem.title}
              </WrapperIcon>
            ),
        )}
      </div>
    </MyPopupListStyle>
  );
});

export default MyPopupList;
