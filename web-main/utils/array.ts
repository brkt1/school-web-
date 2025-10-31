import { SelectProps } from "antd";
import { EnumType, TCId } from "./common_models/commons.model";
export const arrayToObject = <T>(array: T[], key: keyof T) => {
  const initialValue = {};
  return array?.reduce((obj, item) => {
    const objKey = item[key] as string
    return {
      ...obj,
      [objKey]: item,
    };
  }, initialValue);
}

export const checkIfAnyExist = <T>(array: T[], key: keyof T, value: any) => {
  return array.some((arr) => arr[key] == value)
}

export const getByKey = <T>(array: T[], key: keyof T, value: any) => {
  return array.find((arr) => arr[key] == value)
}

export const getIndexKey = <T>(array: T[], key: keyof T, value: any) => {
  return array.findIndex((arr) => arr[key] == value)
}

export const checkIfValueExistInArray = <T>(arr?: T[], value?: T): boolean => {
  if(!arr || !arr.length || !value){
    return false;
  }
  return arr.includes(value);
}

export const deleteValueFromArray = <T>(arr: T[], valueToDelete: T): T[] => {
  return arr.filter((item) => item !== valueToDelete);
}

export const deleteFromArrayByValue = <T>(arr: T[], key: keyof T, valueToDelete: any): T[] => {
  const values = arr.filter((item) => item[key] !== valueToDelete)
  return values;
}

export const checkIfValueExistsInArray = <T, F>(arr1?: T[], arr1Key?: keyof T, arr2?: F[]): boolean => {
  if(!arr1 || !arr1.length || !arr2 || !arr2.length){
    return false;
  }
  return arr1.some(item => arr2.includes((arr1Key ? item[arr1Key] : item) as F));
}

export const areAllValuesInArray = <T, F>(array1?: T[], array1Key?: keyof T, array2?: F[]): boolean => {
  if(!array1 || !array1.length || !array2 || !array2.length){
    return false;
  }
  return array1.every(value => array2.includes((array1Key ? value[array1Key] : value) as F));
}

export const checkIfAllExist = <T>(array: T[], key: keyof T, value: any) => {
  return array.every((arr) => arr[key] == value)
}

export const getById=(list: TCId[], idVal: string)=>{
  return list.find(x => x.id == idVal);
}

export const getValueById = (list: EnumType[],idVal:number) =>{
  return list.find(x => x.id == idVal)
}

export const getLabelByValue = (list: SelectProps["options"], value: number) =>{
  return list?.find(val => val.value == value)?.label
}

export const toggleList = (list: any[], value: any) => {
  return list.indexOf(value) == -1 ? [...list, value] : list.filter(val => val != value)
} 

export function cloneDeep<T>(source: T): T {
  if (typeof source !== 'object' || source === null) {
      // If source is not an object or is null, return it directly
      return source;
  }

  if (Array.isArray(source)) {
      // If source is an array, recursively clone its elements
      return source.map(item => cloneDeep(item)) as any;
  }

  // If source is an object, recursively clone its properties
  const clonedObj: Partial<T> = {};
  for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
          clonedObj[key] = cloneDeep((source as any)[key]);
      }
  }

  return clonedObj as T;
}

export function isEmpty<T>(source: T): T {
  if (typeof source !== 'object' || source === null) {
      // If source is not an object or is null, return it directly
      return source;
  }

  if (Array.isArray(source)) {
      // If source is an array, recursively clone its elements
      return source.map(item => cloneDeep(item)) as any;
  }

  // If source is an object, recursively clone its properties
  const clonedObj: Partial<T> = {};
  for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
          clonedObj[key] = cloneDeep((source as any)[key]);
      }
  }

  return clonedObj as T;
}