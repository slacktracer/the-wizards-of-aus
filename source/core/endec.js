const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';

const endec = {
  decode (string) {

    let decoded = 0;
    while (string) {

      const index = alphabet.indexOf(string[0]);
      const power = string.length - 1;
      decoded += index * Math.pow(alphabet.length, power);
      string = string.substring(1);

    }
    return decoded;

  },
  encode (number) {

    let encoded = '';
    while (number) {

      const remainder = number % alphabet.length;
      number = Math.floor(number / alphabet.length);
      encoded = alphabet[remainder].toString() + encoded;

    }
    return encoded;

  }
};

module.exports = endec;
