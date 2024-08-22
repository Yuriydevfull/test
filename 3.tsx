interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

const WalletPage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    const priorityMap: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorityMap[blockchain] || -99;
  };
  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) =>
          balance.amount > 0 && getPriority(balance.blockchain) > -99
      )
      .sort((leftPriority: WalletBalance, rightPriority: WalletBalance) => {
        return (
          getPriority(rightPriority.blockchain) -
          getPriority(leftPriority.blockchain)
        );
      });
  }, [balances]);

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    return (
      <WalletRow
        className={classes.row}
        key={`${balance.amount}-${balance.blockchain}-${index}`}
        amount={balance.amount}
        usdValue={prices[balance.currency] * balance.amount}
        formattedAmount={balance.amount.toFixed()}
      />
    );
  });

  return (
    <div ref={ref} {...props}>
      {rows}
    </div>
  );
});
WalletPage.displayName = "WalletPage";

export default WalletPage;
