import moment from 'moment';
import { Moment } from 'moment';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../../../store/hooks';
import { arrWarningPushTrue, arrWarningPushFalse, arrWarningCleare } from '../../../../../../../../store/features/arrWarningSlice';
import { readingWarningMarker } from '../../../../../../../../store/features/warningMarkerSlice';
import { sateHalfHourItem } from '../../../../../../../../store/features/halfHourItemSlice';

interface IProps {
  halfHourItem: Moment;
  currentDate: Moment;
}

const HelperWarningMarker:FC<IProps> = ({halfHourItem, currentDate}) => {
  
  const dispatch = useAppDispatch();
  
useEffect(() => { 
    
    
    if (halfHourItem.isSame(moment(), 'hour') &&
    moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
    moment().minute() - halfHourItem.minute() >= 0) {
      // dispatch(readingWarningMarker(true))
      dispatch(arrWarningPushTrue([true]))
      // dispatch(arrWarningCleare())
      //console.log(halfHourItem.hour()) //!
      //dispatch(sateHalfHourItem(4))
      
      
    } 
    dispatch(arrWarningPushFalse([false]))

// &&
// moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
// moment().minute() - halfHourItem.minute() >= 0

     //&& moment().minute() - halfHourItem.minute() > 30 && moment().minute() - halfHourItem.minute() < 59
    // dispatch(arrWarningPushFalse([false]))  
    // dispatch(readingWarningMarker(true));
    // console.log('TRUE') : console.log('FALSE')
    // dispatch(readingWarningMarker(false))  // чтобы массив не рос бесконечно, ограничел до 2-х элементов
    // console.log(`HelperWarningMarker обновлися через 50 секунд`)
}, [currentDate])

  
// halfHourItem.isSame(moment(), 'hour') && 
// halfHourItem.minute() - moment().minute() > 30 // 5:00 - 4:48 = 


// if(halfHourItem.isSame(moment(), 'hour')) {return <>TRUE</>} else if (!halfHourItem.isSame(moment(), 'hour')) {return <>FALSE</>}
  return (
    <>
    </>
  );
};

export default HelperWarningMarker;