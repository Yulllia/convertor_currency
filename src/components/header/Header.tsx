import React, { useEffect, useState } from "react";
import { Row, Col, Layout } from "antd";
import "./Header.css";
import { DollarOutlined, EuroOutlined } from "@ant-design/icons";
import { ExchangeRate } from "../../interface/Interface";
import { message } from "antd";
const { Header } = Layout;

function HeaderCurrency() {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate>({
    USD: 0,
    EUR: 0,
  });

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/UAH`);
        const data = await response.json();

        setExchangeRates({
          USD: data.conversion_rates.USD,
          EUR: data.conversion_rates.EUR,
        });
      } catch (error) {
        message.error("Error fetching exchange rates:" + String(error));
      }
    };
    fetchExchangeRates();
  }, []);
  return (
    <>
      <Header className="header">
        <Row align="middle" className="header-row">
          <Col>Exchange Rate UAH</Col>
          <Row>
            <Col className="col-row">
              USD {(exchangeRates.USD).toFixed(3)} <DollarOutlined />
            </Col>
            <Col>
              EUR {(exchangeRates.EUR).toFixed(3)} <EuroOutlined />
            </Col>
          </Row>
        </Row>
      </Header>
    </>
  );
}

export default HeaderCurrency;
