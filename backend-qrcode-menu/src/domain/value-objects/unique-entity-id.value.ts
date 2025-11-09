import { Types } from 'mongoose';

export class UniqueEntityId {
  private readonly _value: string;

  constructor(id?: string) {
    this._value = id ?? new Types.ObjectId().toHexString();
  }

  get value(): string {
    return this._value;
  }

  toString(): string {
    return this._value;
  }

  equals(id: UniqueEntityId): boolean {
    return id.value === this._value;
  }
}
