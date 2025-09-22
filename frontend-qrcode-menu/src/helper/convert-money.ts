export enum TypeMoney {
  PT_BR = "BRL",
  USD = "USD",
}

export const convertMoney = (money: number, type: TypeMoney): string => {
  return new Intl.NumberFormat(type === TypeMoney.PT_BR ? "pt-BR" : "en-US", {
    style: "currency",
    currency: type,
  }).format(money ?? 0);
};
