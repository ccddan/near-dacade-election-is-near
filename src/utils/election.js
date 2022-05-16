import { v4 as uuid4 } from "uuid";


export function createElection(election) {
  election.id = uuid4();
  return window.contract.setElection({ election });
}

export function getElections() {
  const election =  window.contract.getElections();
  return election
}

export function getElection(id) {
    return window.contract.getElection({id: id})
}

export async function vote({ id, candidate }) {
  await window.contract.vote({ id, candidate  });
}

export function getVotes(id) {
    return window.contract.getVotes({id});
}

