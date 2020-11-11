## Destructuring

  <a name="5.1"></a>
  <a name="destructuring--object"></a>
  - [5.1](#destructuring--object) 用对象的解构赋值来获取和使用对象某个或多个属性值。 eslint: [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring)

    ```javascript
    // bad
    function getFullName(user) {
      const firstName = user.firstName;
      const lastName = user.lastName;

      return `${firstName} ${lastName}`;
    }

    // good
    function getFullName(user) {
      const { firstName, lastName } = user;
      return `${firstName} ${lastName}`;
    }

    // best
    function getFullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    }
    ```

## Comparison Operators & Equality

  <a name="15.2"></a>
  <a name="comparison--if"></a>
  - [15.2](#comparison--if) 条件语句如'if'语句使用强制`ToBoolean'抽象方法来评估它们的表达式，并且始终遵循以下简单规则：

    + **Objects**   计算成 **true**
    + **Undefined** 计算成 **false**
    + **Null**      计算成 **false**
    + **Booleans**  计算成 **the value of the boolean**
    + **Numbers**
      + **+0, -0, or NaN** 计算成 **false**
      + 其他 **true**
    + **Strings**
      + `''` 计算成 **false**
      + 其他 **true**

    ```javascript
    if ([0] && []) {
      // true
      // 数组（即使是空数组）是对象，对象会计算成true
    }
    ```

  <a name="15.3"></a>
  <a name="comparison--shortcuts"></a>
  - [15.3](#comparison--shortcuts) 布尔值用缩写，而字符串和数字要明确比较对象

    ```javascript
    // bad
    if (isValid === true) {
      // ...
    }

    // good
    if (isValid) {
      // ...
    }

    // bad
    if (name) {
      // ...
    }

    // good
    if (name !== '') {
      // ...
    }

    // bad
    if (collection.length) {
      // ...
    }

    // good
    if (collection.length > 0) {
      // ...
    }
    ```

## Control Statements

  <a name="17.1"></a>
  <a name="control-statements"></a>
  - [17.1](#control-statements) 当你的控制语句(`if`, `while` 等)太长或者超过最大长度限制的时候， 把每一个(组)判断条件放在单独一行里。 逻辑操作符放在行首。

    > Why? 把逻辑操作符放在行首是让操作符的对齐方式和链式函数保持一致。这提高了可读性，也让复杂逻辑更容易看清楚。

    ```javascript
    // bad
    if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
      thing1();
    }

    // good
    if (
      (foo === 123 || bar === 'abc')
      && doesItLookGoodWhenItBecomesThatLong()
      && isThisReallyHappening()
    ) {
      thing1();
    }
    ```

## Accessors

  <a name="24.3"></a>
  <a name="accessors--boolean-prefix"></a>
  - [24.3](#accessors--boolean-prefix) 如果属性/方法是`boolean`， 用 `isVal()` 或 `hasVal()`

    ```javascript
    // bad
    if (!dragon.age()) {
      return false;
    }

    // good
    if (!dragon.hasAge()) {
      return false;
    }
    ```

## Standard Library

  <a name="29.1"></a>
  <a name="standard-library--isnan"></a>
  - [29.1](#standard-library--isnan) 用 `Number.isNaN` 代替全局的 `isNaN`.
    eslint: [`no-restricted-globals`](https://eslint.org/docs/rules/no-restricted-globals)

    > Why? 全局 `isNaN` 强制把非数字转成数字， 然后对于任何强转后为 `NaN` 的变量都返回 `true`
    > 如果你想用这个功能，就显式的用它。

    ```javascript
    // bad
    isNaN('1.2'); // false
    isNaN('1.2.3'); // true

    // good
    Number.isNaN('1.2'); // false
    Number.isNaN('1.2.3'); // false
    ```

  <a name="29.2"></a>
  <a name="standard-library--isfinite"></a>
  - [29.2](#standard-library--isfinite) 用 `Number.isFinite` 代替 `isFinite`.
    eslint: [`no-restricted-globals`](https://eslint.org/docs/rules/no-restricted-globals)

    > Why? 理由同上，会把一个非数字变量强转成数字，然后做判断。

    ```javascript
    // bad
    isFinite('2e3'); // true

    // good
    Number.isFinite('2e3'); // false
    ```