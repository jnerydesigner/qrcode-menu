import { DomainError } from './domain.error';

export class NotFoundProductError extends DomainError {
  constructor(message: string) {
    super(message, 404);
  }
}
