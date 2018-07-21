function g(data) {
  return Object.keys(data).map(name => {
    const card = data[name];
    return {
      name: name.replace(/\_/g, " "),
      t_name: card.name.tw.replace(/\s*\(.*\)\s*/g, "") || "",
      desc: [card.rule.tw],
    };
  });
}

var data = {};

console.log(JSON.stringify(g(data)));
