class ObservableMap<K, V> extends Map<K, V> {
  private cb: (entries: [K, V][]) => void;

  constructor(cb: (entries: [K, V][]) => void) {
    super();
    this.cb = cb;
  }

  set(key: K, value: V): this {
    if (super.has(key)) return this;

    super.set(key, value);
    this.cb(Array.from(this.entries()));

    return this;
  }
}

export default ObservableMap;
