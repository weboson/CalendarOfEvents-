// лигика по расчетам приёма лекарств(taking medications), exm: за 30 минут до еды, перед сном, спустя 20 мин после еды и так далее.
import * as takingMedications from '../data/localDataBase/LocalDB_WaysUsing.ts'


switch (takingMedications.default.expressionsTime[2].oftime) { // вовремя, до, после
    case 'while': // вовремя

        break;
    case 'before': // до (за время до, сразу перед едой...)

        break;
    case 'after': // после
    
        break;

    default:
        break;
}