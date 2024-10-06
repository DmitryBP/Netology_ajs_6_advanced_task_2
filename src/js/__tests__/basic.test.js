import Bowman from "../classes/Bowman";
import Character from "../classes/Character";
import orderByProps from "../functions/orderByProps";
import showSpecialAttack from "../functions/showSpecialAttack";
describe("тесты персонажа", () => {
  test("Показатели должны изменяться правиль", () => {
    const hero = new Bowman("Dima");
    hero.levelUp();
    expect(hero.level).toBe(2);
    expect(hero.attack).toBe(25 * 1.2);
    expect(hero.defence).toBe(25 * 1.2);
    expect(hero.attack).toBe(25 * 1.2);
    expect(hero.health).toBe(100);
  });

  test("В имени должно быть больше 2-х знаков", () => {
    expect(() => new Character("D", "Bowman")).toThrow();
  });
  test("В имени должно не больше 10 знаков", () => {
    expect(() => new Character("Dimadimadim", "Bowman")).toThrow();
  });
  test("Тип героя должен соответствовать списку героев", () => {
    expect(() => new Character("Dima", "Bowman1")).toThrow();
  });
  test("Мертвому игроку нельзя повысить уровень", () => {
    expect(() => {
      const vasia = new Character("Vasia", "Bowman");
      vasia.health = 0;
      vasia.levelUp();
    }).toThrow();
  });
  test("Урон должен считается правильно", () => {
    const hero = new Bowman("Petr");
    hero.damage(10);
    expect(hero.health).toBe(92.5);
  });
  test("Значение здоровья при любом уроне не станет меньше нуля", () => {
    const vasia = new Character("Vasia", "Bowman");
    vasia.damage(200);
    expect(vasia.health).toBe(0);
  });
});

describe("Тесты функции сортировки массива", () => {
  test("функция должна сортировать объект правильно", () => {
    const obj = {
      name: "мечник",
      health: 10,
      level: 2,
      attack: 80,
      defence: 40,
    };
    expect(orderByProps(obj, ["name", "level"])).toEqual([
      { key: "name", value: "мечник" }, // порядок взят из массива с ключами
      { key: "level", value: 2 }, // порядок взят из массива с ключами
      { key: "attack", value: 80 }, // порядок по алфавиту (т.к. в массиве с ключами нет значения "attack")
      { key: "defence", value: 40 }, // порядок по алфавиту (т.к. в массиве с ключами нет значения "defence")
      { key: "health", value: 10 }, // порядок по алфавиту (т.к. в массиве с ключами нет значения "health")
    ]);
  });

  test("функция должна возращать массив специальных атак", () => {
    const obj = {
      name: "Лучник",
      type: "Bowman",
      health: 50,
      level: 3,
      attack: 40,
      defence: 10,
      special: [
        {
          id: 8,
          name: "Двойной выстрел",
          icon: "http://...",
          description: "Двойной выстрел наносит двойной урон",
        },
        {
          id: 9,
          name: "Нокаутирующий удар",
          icon: "http://...",
          // <- обратите внимание, описание "засекречено"
        },
      ],
    };

    expect(showSpecialAttack(obj)).toEqual([
      {
        id: 8,
        name: "Двойной выстрел",
        icon: "http://...",
        description: "Двойной выстрел наносит двойной урон",
      },
      {
        id: 9,
        name: "Нокаутирующий удар",
        icon: "http://...",
        description: "Описание недоступно"
      },
    ]);
  });
});
