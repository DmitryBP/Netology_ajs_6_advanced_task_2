const character = {
  name: 'Лучник',
  type: 'Bowman',
  health: 50,
  level: 3,
  attack: 40,
  defence: 10,
  special: [
    {
      id: 8,
      name: 'Двойной выстрел',
      icon: 'http://...',
      description: 'Двойной выстрел наносит двойной урон',
    },
    {
      id: 9,
      name: 'Нокаутирующий удар',
      icon: 'http://...',
      // <- обратите внимание, описание "засекречено"
    },
  ],
};

function showSpecial({ special: [el1, el2] }) {
  const startArr = [el1, el2];

  startArr.forEach((e) => {
    if (e.description === undefined) {
      e.description = 'Описание недоступно';
    }
  });

  return startArr;
}

console.log(showSpecial(character));
