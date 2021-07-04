const RegexBool = (myRegex, str) => {
    const RegexinFunction = new RegExp(`${myRegex}`, 'gi');
    return RegexinFunction.test(str);
};

module.exports = RegexBool;
