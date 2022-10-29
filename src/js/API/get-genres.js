// Функция для получения названий жанров
export function getGenres(genreList, genreIds) {
  const arrOfGenresName = genreIds.map(currenId => {
    const genre = genreList.find(elem => elem.id === currenId);

    return genre.name;
  });

  const str = arrOfGenresName.reduce((acc, genre, index, arr) => {
    if (arr.length > 2) {
      acc = `${arr[0]}, ${arr[1]}, Other`;
    } else {
      acc = arr.join(', ');
    }

    return acc;
  }, '');

  return str;
}
