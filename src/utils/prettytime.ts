export const prettyTime = (firebaseDate: number) => {
  const dateFromFirebase = new Date(firebaseDate * 1000);
  const day = dateFromFirebase.getDate();
  const month = dateFromFirebase.getMonth() + 1;
  const year = dateFromFirebase.getFullYear();

  // Формируем строку в формате "дд.мм.гггг"
  const formattedDate = `${day < 10 ? "0" : ""}${day}.${
    month < 10 ? "0" : ""
  }${month}.${year}`;

  return formattedDate;
};
