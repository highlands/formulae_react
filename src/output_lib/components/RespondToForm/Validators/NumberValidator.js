const re = /\D/;

function valid(number) {
  return !re.test(number);
}

export default {
  valid
};
