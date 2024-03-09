//! метод - for Warning marker (Предупреждающий маркер, когда текущее время совпадает с приёмом лекарства)
import { Moment } from 'moment';
import moment from 'moment';
import { arrBoolean } from '../../../../GridDayWithHours';


export const helperWarningMarker = (halfHourItem: Moment) => {
  halfHourItem.isSame(moment(), 'hour') &&
  moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
  moment().minute() - halfHourItem.minute() >= 0 ?
  arrBoolean.push('true') : 
  (arrBoolean.push('false') ? arrBoolean.length = 2 : null) // чтобы массив не рос бесконечно, ограничел до 2-х элементов

};