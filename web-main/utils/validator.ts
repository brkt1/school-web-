export interface validatorModel<T>{
    value: T, 
    comp: T, 
    validate: Function,
}

export interface validatorModelWithMsg<T> extends validatorModel<T>{
    msg: string, 
}

export interface andOrValidatorModel<T>{
    type: 'OR' | 'AND'
    validators: (validatorModel<T> | andOrValidatorModel<T>)[]
    msg: string
}

export const isNumber = (value: any) => {
    return value instanceof Number
}

export const isString = (value: any) => {
    return value instanceof String
}

export const isGt0 = (value: number, msg: string = '', isReturn: boolean = false) => {
    return isGtV(value, 0, msg, isReturn)
}

export const isEqGt0 = (_: any, value: number) => {
    return isEqV(value, 0, "The item must be greater than Zero", false)
}

export const isEqV = <T>(value: T, comp: T, msg: string, isReturn: boolean = false) => {
    if (value == comp) {
        return  Promise.resolve();
    } else {
        return  Promise.reject(msg);
    }
}

export const isGtV = <T>(value: T, comp: T, msg: string, isReturn: boolean = false) => {
    if (value > comp) {
        return  Promise.resolve();
    } else {
        return Promise.reject();
    }
}

export const isGtEqV = <T>(value: T, comp: T, msg: string, isReturn: boolean = false) => {
    if (value >= comp) {
        return isReturn ? true : Promise.resolve();
    } else {
        return isReturn ? false : Promise.reject(msg);
    }
}

export const isLtV = <T>(value: T, comp: T, msg: string, isReturn: boolean = false) => {
    if (value < comp) {
        return isReturn ? true : Promise.resolve();
    } else {
        return isReturn ? false : Promise.reject(msg);
    }
}

export const isLtEqV = <T>(value: T, comp: T, msg: string, isReturn: boolean = false) => {
    if (value <= comp) {
        return isReturn ? true : Promise.resolve();
    } else {
        return isReturn ? false : Promise.reject(msg);
    }
}

export const multiValidate = <T>(validators: validatorModelWithMsg<T>[]) => {
    for (let validator of validators){
        validator.validate(validator.value, validator.comp, validator.msg)
    }
}

export const andMultiValidate = <T>(validators: validatorModel<T>[], msg: string, isReturn: boolean = false) => {
    for (let validator of validators){
        if(!validator.validate(validator.value, validator.comp, undefined, true)){
            return isReturn ? false : Promise.reject(msg)
        }
    }
    return isReturn ? true : Promise.resolve();
}

export const orMultiValidate = <T>(validators: validatorModel<T>[], msg: string, isReturn: boolean = false) => {
    for (let validator of validators){
        if(validator.validate(validator.value, validator.comp, undefined, true)){
            return isReturn ? true : Promise.resolve();
        }
    }
    return isReturn ? false : Promise.reject(msg)
}

export const multiValidateAndOr = <T>(validators: andOrValidatorModel<T>) => {
    if(validators.type == 'AND'){
        for (let validator of validators.validators){
            if('type' in validator){
                if(!multiValidateAndOr(validator)){
                    return false
                }
            } else {
                if(!validator.validate(validator.value, validator.comp, undefined, true)){
                    return false
                }
            }
        }
        return true;
    } else {
        for (let validator of validators.validators){
            if('type' in validator){
                if(multiValidateAndOr(validator)){
                    return true
                }
            } else {
                if(validator.validate(validator.value, validator.comp, undefined, true)){
                    return true
                }
            }
        }
        return false;
    }
}