import { UniqueEntityId } from '@domain/value-objects/unique-entity-id.value';

describe('UniqueEntityId VO', () => {
  it('deve gerar um novo UUID quando nenhum id for passado', () => {
    const id = new UniqueEntityId();
    expect(id.value).toBeDefined();
    expect(typeof id.value).toBe('string');
    expect(id.value).toHaveLength(36);
  });

  it('deve aceitar um id existente', () => {
    const existing = 'abc-123';
    const id = new UniqueEntityId(existing);
    expect(id.value).toBe(existing);
  });

  it('toString deve retornar o mesmo valor do id', () => {
    const id = new UniqueEntityId('my-id');
    expect(id.toString()).toBe('my-id');
  });

  it('equals deve retornar true para ids iguais', () => {
    const id1 = new UniqueEntityId('same-id');
    const id2 = new UniqueEntityId('same-id');
    expect(id1.equals(id2)).toBe(true);
  });

  it('equals deve retornar false para ids diferentes', () => {
    const id1 = new UniqueEntityId('id-1');
    const id2 = new UniqueEntityId('id-2');
    expect(id1.equals(id2)).toBe(false);
  });
});
