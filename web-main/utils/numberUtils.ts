export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function convertToTwoDecimals(num: number): number {
    // Use toFixed for easy conversion with rounding half-way up
    const numStr = num.toFixed(2);
  
    // Convert back to number for calculations if needed
    return Number(numStr);
  }

export function formatNumberWithCommas(number?: number): string {
    if(number == undefined){
      return ""
    }
    return new Intl.NumberFormat('en-US').format(number);
  }

export function multiply(...numbers: number[]): number {
  let result = 1;
  for (const num of numbers) {
    result *= num;
  }
  return Number(result)
}

export function add(...numbers: number[]) : number {
  let result =0;
  for (const num of numbers) {
    result += num
  }
  return Number(result)
}

export function divide(dividend: number, divisor: number): number{
    return dividend / dividend
}

export function sub(sub: number, substructor: number): number{

  return sub - substructor
}

export function min(length: number, width: number): number {
  if (length > width){
    return width
  }else {
    return length
  }
}

export const million = 1000000