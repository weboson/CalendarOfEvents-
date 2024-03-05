//! for Warning marker (Предупреждающий маркер, когда текущее время совпадает с приёмом лекарства)
import moment from 'moment';
import { Moment } from 'moment';
import { readingWarningMarker } from '../../../../../../../store/features/warningMarkerSlice';
import { AppDispatch } from '../../../../../../../store/store';
import { useDispatch } from 'react-redux';

//! helper: возращает потребителям true/false - и там же вызываю useAppDispatch
export const helperWarningMarker = (
  firstMeal: Moment,
  halfHourItem: Moment,
  dayItem: Moment,
  dispatch: (a: object ) => AppDispatch = useDispatch,
) => {
  moment().isSame(firstMeal, 'hour') &&
  dayItem.isSame(moment(), 'day') &&
  moment().minute() - halfHourItem.minute() < 30 && //exp: 4:01 - 4:00/4:30 = 1/-29 < 30 -> true/true
  moment().minute() - halfHourItem.minute() >= 0
    ? dispatch(readingWarningMarker(true))
    : dispatch(readingWarningMarker(false));
};
