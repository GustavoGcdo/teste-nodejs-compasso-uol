export class UniqueId {
  private _value: string | number;

  constructor(id: string | number) {
    this._value = id;
  }

  public get value(): string | number {
    return this._value;
  }

  toString(): string {
    return String(this._value);
  }
}
