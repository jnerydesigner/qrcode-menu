import { DomainError } from './domain.error';

export class ExistsProductError extends DomainError {
  constructor(message: string) {
    super(message, 422);
  }
}
