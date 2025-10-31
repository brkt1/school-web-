import { PhoneNumber } from "antd-phone-input";
import { TableSearchModel } from "./common_models/commons.model";
import _ from 'lodash'

export const method: string = "method"

export const notEmpty = (s: string) => s != undefined && s != null && s.length > 0  

export const snakeToCapitalized = (str: string) => {
    return _.startCase(_.toLower(str)).replace(/_/g, ' ');
  };

export const getParamQuery= <T extends TableSearchModel | undefined=any>(search: T) => {
    let params: any = {...search}
    if(search?.ordering){
        let ordering = ""
        if(search.ordering.so == 'ascend'){
            ordering += search.ordering.sc.toString()
        } else {
            ordering += "-" + search.ordering.sc.toString()
        }
        params['ordering'] = ordering
    }
    return params
}

export const currency = ' ETB'

export const phoneNumberString = (phoneNumber?: PhoneNumber | string) => {
    if(typeof phoneNumber == 'string' ){
        return phoneNumber;
    }
    if(!phoneNumber){
        return ""
    }
    return "+" +
        (phoneNumber.countryCode || "") +
        (phoneNumber.areaCode || "") +
        phoneNumber.phoneNumber;
}
