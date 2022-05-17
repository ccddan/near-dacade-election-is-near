import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddElection from "./AddElection";
import Election from "./Election";
import Loader from "./Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "./Notifications";
import { createElection, getElection, getElections } from "../utils/election";


export default function Elections() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(false);


 

  const getElectionsList = useCallback(async () => {
    try {
      setLoading(true);
      setElections(await getElections());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addElection = async (data) => {
  try {
    setLoading(true);
    createElection(data).then((resp) => {
      getElectionsList();
    });
    toast(<NotificationSuccess text="Election added successfully." />);
  } catch (error) {
    let err =  "Failed to Create Election"
        try {
          err = error.kind.ExecutionError.split(",")[0].split(":")[1]
        }
        finally {toast(<NotificationError text={err} />);};
  } finally {
    setLoading(false);
  }
};



useEffect(() => {
  getElectionsList();
}, []);

return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Election-is-near</h1>
            <AddElection  save={addElection}/>
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {elections.map((_election, _index) => (
              <Election key={_index} electionId={_index}
                election={{
                  ..._election,
                }}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};