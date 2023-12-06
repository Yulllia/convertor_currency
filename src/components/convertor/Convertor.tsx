import React, { ChangeEvent, useEffect, useState } from "react";
import CurrencyRow from "../currencyRow/CurrencyRow";
import "./Convertor.css";
import { ConversionRates } from "../../interface/Interface";
import { message } from "antd";

function Convertor() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [conversationRate, setConversationRate] = useState<ConversionRates>({});
  const [amount, setAmount] = useState<number>(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState<boolean>(
    true
  );

  let toAmount: number, fromAmount: number;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = +(amount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = +(amount / exchangeRate).toFixed(2);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/USD`)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.conversion_rates)[1];
        const conversionRateEntries = Object.keys(data.conversion_rates);
        const additionalCurrencies = ["EUR", "UAH", "UYU", "AED", "AMD", "CHF"];
        const additionalCurrencyOptions = additionalCurrencies.filter(
          (currency) => conversionRateEntries.includes(currency)
        );
        setCurrencyOptions([data.base_code, ...additionalCurrencyOptions]);
        setFromCurrency(data.base_code);
        setToCurrency(firstCurrency);
        setExchangeRate(data.conversion_rates[firstCurrency]);
      })
      .catch((error) => {
        message.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null) {
      fetch(`${process.env.REACT_APP_BASE_URL}/${fromCurrency}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => setConversationRate(data.conversion_rates))
        .catch((error) => {
          message.error("Error fetching data:", error);
        });
    }
  }, [fromCurrency]);

  useEffect(() => {
    if (conversationRate != null) {
      setExchangeRate(conversationRate[toCurrency]);
    }
  }, [conversationRate, toCurrency]);

  function handleAmountChange(
    e: ChangeEvent<HTMLInputElement>,
    isInFromCurrency: boolean
  ) {
    const value = parseFloat(e.target.value);

    if (!isNaN(value)) {
      setAmount(value);
      setAmountInFromCurrency(isInFromCurrency);
    }
  }
  function getCurrencyOption(value: string){
    return currencyOptions.filter(
      (option) => option !== value
    )
  }

  return (
    <div className="convertor-container">
      <h2>Convertor currency</h2>
      <CurrencyRow
        currencyOptions={getCurrencyOption(toCurrency)}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(value) => setFromCurrency(value)}
        onChangeAmount={(e) => handleAmountChange(e, true)}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={getCurrencyOption(fromCurrency)}
        selectedCurrency={toCurrency}
        onChangeCurrency={(value) => setToCurrency(value)}
        onChangeAmount={(e) => handleAmountChange(e, false)}
        amount={toAmount}
      />
    </div>
  );
}

export default Convertor;
