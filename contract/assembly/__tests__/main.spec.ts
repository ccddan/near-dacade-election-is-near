import { setElection, vote, getElection, getVotes} from '..'
import { Election } from '../model'

describe('Election ', () => {
  it('should create election', () => {
    let election = new Election()
    election.candidates = ["Jude", "Ben"];
    election.position = "president";
    election.id = "22"
    election.description = "post of president"
    setElection(election)
    const result = getElection("22")
    expect(result ? result.id : null).toBe("22")
  })

  it('should vote', () => {
    let election = new Election()
    election.candidates = ["Jude", "Ben"];
    election.position = "president";
    election.id = "22"
    election.description = "post of president"
    setElection(election)
    let result1 = getVotes("22");
    let vote1 = result1 ? result1.get("Jude")  : 0;
    vote("22", "Jude")
    let result2 = getVotes("22")
    let vote2 = result2 ? result2.get("Jude") : 0;
    expect(vote1 + 1 ).toBe(vote2)
  })
})
