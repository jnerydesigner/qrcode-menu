export class SlugEntity {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  static create(text: string): SlugEntity {
    if (!text || text.trim().length === 0) {
      throw new Error('Slug não pode ser vazio');
    }

    const slug = text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    return new SlugEntity(slug);
  }

  static fromValue(value: string): SlugEntity {
    if (!value || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
      throw new Error(`Slug inválido: ${value}`);
    }
    return new SlugEntity(value);
  }

  toString(): string {
    return this._value;
  }

  equals(other: SlugEntity): boolean {
    return this._value === other._value;
  }
}
