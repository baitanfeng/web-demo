function validate() {
  if (user.name === '') {
    console.log('用户名不能为空');
    return false;
  }
  if (user.password === '') {
    console.log('密码不能为空');
    return false;
  }

  return true;
}

function formSubmit() {
  const params = {
    username: user.name,
    password: user.password
  };
  ajax(url, params);
}

function formSubmitProxy() {
  const proxy = new Proxy(formSubmit, {
    apply(trapTarget, thisArg, argumentList) {
      if (!validate()) return;
      return Reflect.apply(trapTarget, thisArg, argumentList);
    }
  });

  proxy();

  // if (!validate()) return;
  // formSubmit();
}

formSubmitProxy();