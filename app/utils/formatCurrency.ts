interface iAppProps {
    amount: number;
    currency: "ZAR" | "EUR" | string;
  }
  
  export function formatCurrency({ amount, currency }: iAppProps) {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: currency,
    }).format(amount);
  }
  