// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace

{
    const str = 'mu bai';
    str.replace(/(\w+)\s(\w+)/, "$2 $1"); // bai mu
    str.replace(/(\w+)\s(\w+)/, "--$&--"); // --mu bai--
    str.replace(/\s(\w+)/, "$`"); // mumu
    str.replace(/(\w+)\s/, "$'"); // baibai
}