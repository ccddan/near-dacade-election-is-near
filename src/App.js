import React, { useEffect, useCallback, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { login, logout as destroy, accountBalance } from "./utils/near";
import Wallet from "./components/Wallet";
import { Notification } from "./components/Notifications";
import Cover from "./components/Cover";
import coverImg from "./assets/img/election.jpg";
import "./App.css";
import Elections from "./components/Elections";
import ViewElection from "./components/ViewElection";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

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
      <Router>
        <Notification />
        <Routes>
          <Route path="election/:id" element={<ViewElection />} /> 
          <Route path="/"
          element={
            account.accountId ? (
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
              <Cover name="Credible Elections" login={login} coverImg={coverImg} />
            )} />
        </Routes>
      </Router>
    </>
  );
};