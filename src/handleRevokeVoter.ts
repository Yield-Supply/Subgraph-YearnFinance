import { BigInt, log, ethereum } from "@graphprotocol/graph-ts"
import {
    Contract,
    NewProposal,
    OwnershipTransferred,
    ProposalFinished,
    RegisterVoter,
    RevokeVoter,
    RewardAdded,
    RewardPaid,
    Staked,
    Vote,
    Withdrawn,
    ProposeCall
} from "../generated/Contract/Contract"
import { Proposal, Ballot } from "../generated/schema"
import { getProposal, getVoter, getHistory } from "./HELPERS"

export function handleRevokeVoter(event: RevokeVoter): void { 

    let voter = getVoter(event.params.voter.toHexString())
    let voteCount = event.params.votes
    let newTotalVoteCount = event.params.totalVotes

    //Get History
    let history = getHistory()
    history.totalVotes = newTotalVoteCount
    history.totalVoterCount = history.totalVoterCount.minus(BigInt.fromI32(1))

    //Update Voter
    voter.voteCount = voteCount
    voter.voterRegistered = false

    //Save
    voter.save()
    history.save()
}