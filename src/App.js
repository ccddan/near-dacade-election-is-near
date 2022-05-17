import React, { useEffect, useCallback, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { login, logout as destroy, accountBalance } from "./utils/near";
import Wallet from "./components/Wallet";
import { Notification } from "./components/Notifications";
import Cover from "./components/Cover";
import coverImg from "./assets/img/election.jpg";
import "./App.css";
import Elections from "./components/Elections";



export default function App() {
  const account = window.walletConnection.account();
  const [balance, setBalance] = useState("0");
  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  });

  useEffect(() => {
    getBalance();
  }, [getBalance]);

    return (
    <>
   
      {account.accountId ? (
              <Container fluid="md">
                <Nav className="justify-content-end pt-3 pb-5">
                  <Nav.Item>
                    <Wallet
                      address={account.accountId}
                      amount={balance}
                      symbol="NEAR"
                      destroy={destroy}
                    />
                  </Nav.Item>
                </Nav>
                <Elections />
              </Container>
            ) : (
              <Cover name="Election-is-near" login={login} coverImg={coverImg} />
            )} 
    </>
  );
};