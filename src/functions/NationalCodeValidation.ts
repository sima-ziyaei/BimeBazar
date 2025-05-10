export const isValidNationalCode = (value) => {
  if (value.length !== 10 || /(\d)(\1){9}/.test(value)) return false;

  let sum = 0;
  const chars = value.split("");

  for (let i = 0; i < 9; i += 1) sum += +chars[i] * (10 - i);

  let lastDigit = null;
  const remainder = sum % 11;

  lastDigit = remainder < 2 ? remainder : 11 - remainder;

  return +chars[9] === lastDigit;
};
