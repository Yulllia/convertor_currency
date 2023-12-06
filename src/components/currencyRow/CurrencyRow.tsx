import React, { ChangeEventHandler } from "react";
import { Input, Select } from "antd";
import "./CurrencyRow.css";

function CurrencyRow(props: {
  currencyOptions: string[];
  selectedCurrency: string;
  onChangeCurrency: (value: string) => void;
  onChangeAmount: ChangeEventHandler<HTMLInputElement>;
  amount: number;
}) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;

  const { Option } = Select;

  return (
    <div className="currency-row">
      <Input
        min={1}
        data-testid="input-currency"
        className="input"
        type="number"
        value={amount}
        onChange={onChangeAmount}
      />
      <Select data-testid="select-currency" value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </div>
  );
}
export default CurrencyRow;
