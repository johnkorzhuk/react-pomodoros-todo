function* genId() {
  let id = 0;
  while (true) {
    yield `${id++}-${Date.now()}`;
  }
}

export const newId = new genId();