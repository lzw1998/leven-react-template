function getString() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('2022/4/16 1:08');
    }, 2000);
  });
}

async function helloWorld() {
  const str = await getString();
  console.log(str);
}

export default helloWorld;
