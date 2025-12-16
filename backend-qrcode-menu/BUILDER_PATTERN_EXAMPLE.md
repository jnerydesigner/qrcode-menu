# Padrão Builder - MagicLinkEntity

## Implementação Completa

A classe `MagicLinkEntity` agora implementa o **padrão Builder**, proporcionando uma forma fluente e flexível de criar instâncias.

## Características

### ✅ Propriedades Imutáveis
Todas as propriedades são `readonly`, garantindo imutabilidade após a criação.

### ✅ Getters
Acesso controlado às propriedades através de getters.

### ✅ Validações
O Builder valida os campos obrigatórios antes de criar a instância.

### ✅ Valores Padrão
ID e timestamps são gerados automaticamente se não fornecidos.

## Exemplos de Uso

### 1. Criação Simples (Factory Method)
```typescript
const magicLink = MagicLinkEntity.create(
  'user@example.com',
  'https://app.com/magic/abc123'
);
```

### 2. Usando o Builder - Criação Básica
```typescript
const magicLink = MagicLinkEntity.builder()
  .withEmail('user@example.com')
  .withMagicLink('https://app.com/magic/abc123')
  .build();
```

### 3. Usando o Builder - Criação Completa
```typescript
const magicLink = MagicLinkEntity.builder()
  .withId('custom-id-123')
  .withEmail('user@example.com')
  .withMagicLink('https://app.com/magic/abc123')
  .withCreatedAt(new Date('2024-01-01'))
  .withUpdatedAt(new Date('2024-01-01'))
  .build();
```

### 4. Reconstrução a partir de Dados do Banco
```typescript
const magicLink = MagicLinkEntity.builder()
  .withId(dbData._id.toString())
  .withEmail(dbData.email)
  .withMagicLink(dbData.magic_link)
  .withCreatedAt(dbData.created_at)
  .withUpdatedAt(dbData.updated_at)
  .build();
```

### 5. Acessando Propriedades
```typescript
const magicLink = MagicLinkEntity.create(
  'user@example.com',
  'https://app.com/magic/abc123'
);

console.log(magicLink.id);        // ID gerado automaticamente
console.log(magicLink.email);     // 'user@example.com'
console.log(magicLink.magicLink); // 'https://app.com/magic/abc123'
console.log(magicLink.createdAt); // Data atual
console.log(magicLink.updatedAt); // Data atual
```

## Validações

O Builder lança erros se campos obrigatórios não forem fornecidos:

```typescript
// ❌ Erro: Email is required
MagicLinkEntity.builder()
  .withMagicLink('https://app.com/magic/abc123')
  .build();

// ❌ Erro: Magic link is required
MagicLinkEntity.builder()
  .withEmail('user@example.com')
  .build();
```

## Vantagens do Padrão Builder

1. **Legibilidade**: Código mais claro e autodocumentado
2. **Flexibilidade**: Permite criar objetos com diferentes combinações de parâmetros
3. **Validação**: Centraliza validações no método `build()`
4. **Imutabilidade**: Propriedades readonly garantem que o objeto não seja modificado após criação
5. **Valores Padrão**: Gera automaticamente IDs e timestamps quando não fornecidos
6. **Type Safety**: TypeScript garante que os tipos estão corretos em tempo de compilação
