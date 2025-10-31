import _ from 'lodash'
import { snakeToCapitalized } from './stringUtills';

export function deleteKey<T>(obj: T, key: keyof T): void {
  delete obj[key];
}

export function enumToLabelValueArray(enumObj: any): { label: string, value: string }[] {

  return Object.keys(enumObj)
    .filter(key => !isNaN(Number(enumObj[key])))
    .map(key => ({
      label: /^[0-9]/.test(key) ? key : snakeToCapitalized(key),
      value: enumObj[key]
    }));
}

export function enumToTextValueArray(enumObj: any): { text: string, value: string }[] {

  return Object.keys(enumObj)
    .filter(key => !isNaN(Number(enumObj[key])))
    .map(key => ({
      text: /^[0-9]/.test(key) ? key : snakeToCapitalized(key),
      value: enumObj[key]
    }));
}

export function getKeysOfType<T>(dummyObject: T): { label?: string, value?: string }[] {
  if (dummyObject) {
    return Object.keys(dummyObject).map(key => ({
      label: key,
      value: key
    }));
  }
  return []
}

export function getEnumByString<T>(enumObj: T, key: string): T[keyof T] | undefined {
  return enumObj[key.toUpperCase() as keyof T];
}

export function sliceArray<T>(arr: T[], start: number, end: number): T[] {
  const endIndex = Math.min(end, arr.length);
  return arr.slice(start, endIndex);
}

export function getValuesByPaths(obj: object, paths: string[]) {
  return paths.map(path => _.get(obj, path));
}

export function getEnumName(enumObj: any, value?: number): string | undefined {
  if (value == undefined) {
    return undefined;
  }
  const entries = Object.entries(enumObj);
  for (const [key, val] of entries) {
    if (val === value) {
      return snakeToCapitalized(key);
    }
  }
  return undefined;
}