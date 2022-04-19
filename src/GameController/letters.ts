export enum Letters {
  "A" = 1,
  "B" = 2,
  "C" = 3,
  "D" = 4,
  "E" = 5,
  "F" = 6,
  "G" = 7,
  "H" = 8
}

export function GetLetterFromValue(value: number) {
    const enumNames: string[] = Object.keys(Letters).filter(key => Letters[key] === value);
    return enumNames.length > 0 ? enumNames[0] : '';
}

export function GetLetterFromKey(key: string) {
   return Letters[key];
}

