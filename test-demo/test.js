const strategies = {
  [TYPE.JUICE]: '果汁',
  [TYPE.SALAD]: '拉沙',
  [TYPE.JAM]: '果酱'
};

strategies['apple'] = '苹果';

function enjoy(type = TYPE.JUICE) {
  return strategies[type] || '';
}