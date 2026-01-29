const totalLikes = (array) => {
  return array.reduce((acc, curr) => acc + curr.likes, 0);
};

module.exports = {
  totalLikes,
};
