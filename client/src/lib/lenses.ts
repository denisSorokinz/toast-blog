type AbstractObject = { [key: string]: any };

class Lens {
  source;
  destination;

  constructor(source: string, destination = source) {
    this.source = source;
    this.destination = destination;
  }
  static from(source: string, destination?: typeof source) {
    return new Lens(source, destination);
  }
  get(obj: AbstractObject) {
    return obj[this.source];
  }
  set(val: any, obj: AbstractObject) {
    return { ...obj, [this.destination]: val };
  }
}

class OnlyPropertiesLens {
  source;

  constructor(source: string[]) {
    this.source = source;
  }
  static from(source: string[]) {
    return new OnlyPropertiesLens(source);
  }
  view(obj: AbstractObject) {
    const res = { ...obj };

    for (let key in res) {
      if (!this.source.includes(key)) delete res[key];
    }

    return res;
  }
}

class ExcludeLens extends Lens {
  static from(source: string, destination?: string) {
    return new ExcludeLens(source, destination);
  }
  view(obj: AbstractObject) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => key !== this.source),
    );
  }
}

export const noParamsLens = ExcludeLens.from("params");

export { OnlyPropertiesLens };
