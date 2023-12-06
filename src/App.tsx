import React from 'react';
import './App.css';
import Convertor from './components/convertor/Convertor';
import HeaderCurrency from './components/header/Header';
import { Layout } from "antd";
const { Content } = Layout;

function App() {
  return (
    <Layout className="App">
      <HeaderCurrency/>
      <Content style={{backgroundColor: "white"}}>
        <h1>Convertor currency</h1>
       <Convertor/>
      </Content>
    </Layout>
  );
}

export default App;
