
import { Election, allElection } from './model';
import { ContractPromiseBatch, context, PersistentMap } from 'near-sdk-as';

export function setElection(election: Election): void {
    let elect = allElection.get(election.id);
    assert(elect === null, `an election with ${election.id} already exists`);
    allElection.set(election.id, Election.fromPayload(election));
}

export function getElection(id: string): Election | null {
    return allElection.get(id);
}

export function getElections(): Election[] {
    return allElection.values();
}

export function vote(id: string, candidate: string): void {
   const election = getElection(id);
   if (election == null) {
       throw new Error("election not found");
    }
    
    election.vote(candidate);
    allElection.set(election.id, election);
}

export function getVotes(id: string
    ) : Map<string, u32>  | null {
    const election =  allElection.get(id);
    return election? election.getVotes() : null
}


