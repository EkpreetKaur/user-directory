import { COUNTRY_LIST, USER_LIST, YOB_LIST } from "../../actions/types";
const initialState = {
    users: [],
    countries: [],
    yearOfBirthList: []

}

export default function(state=initialState, action){
    switch(action.type) {
        case USER_LIST:
            return{
                ...state,
                users: action.payload
            }

            case COUNTRY_LIST:
                return{
                    ...state,
                    countries: [...new Set(action.payload)]
                }  
                case YOB_LIST:
                return{
                    ...state,
                    yearOfBirthList: [...new Set(action.payload)]
                }    

            default: return state;
    }

}