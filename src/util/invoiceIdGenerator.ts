function generateInvoiceId(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const getRandomLetter = () =>
    letters[Math.floor(Math.random() * letters.length)];
  const getRandomDigits = () =>
    Math.floor(1000 + Math.random() * 9000).toString(); // ensures 4 digits

  return `${getRandomLetter()}${getRandomLetter()}${getRandomDigits()}`;
}

export default generateInvoiceId;
