const favoriteBlog = (array) => {
  const orderedArray = array.sort((a, b) => b.likes - a.likes);
  console.log(orderedArray);
  const favorite = orderedArray[0];
  console.log(favorite);
  return favorite;
};

module.exports = {
  favoriteBlog,
};
