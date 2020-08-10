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

export function handleVote(event: Vote): void { 


    let support = event.params.vote
    let weight = event.params.weight
    let proposalId = event.params.id

    //Get the Proposal
    let proposal = getProposal(proposalId.toString())

    //Get the Voter    
    let voter = getVoter(event.params.voter.toHexString())

    //Create a Ballot
    let ballot = new Ballot(event.transaction.hash.toHex())
    //Add Data to Ballot
    ballot.timestamp = event.block.timestamp
    ballot.blockNumber = event.block.number
    ballot.voter = voter.id
    ballot.support = support
    ballot.voteWeight = weight
    ballot.proposal = proposal.id

    //Add Data to Voter
    let ballotsCast = voter.ballotsCast
    ballotsCast.push(ballot.id)
    voter.ballotsCast = ballotsCast
    voter.proposalsParticipatedCount = voter.proposalsParticipatedCount.plus(BigInt.fromI32(1))

    //Add Data to Proposal
    let proposalBallots = proposal.ballots
    proposalBallots.push(ballot.id)
    proposal.ballots = proposalBallots
    proposal.participentCount = proposal.participentCount.plus(BigInt.fromI32(1))
    if(support){
        proposal.forVotes = proposal.forVotes.plus(weight)
    } else {
        proposal.againstVotes = proposal.againstVotes.plus(weight)
    }



    proposal.save()
    ballot.save()
    voter.save()
  
}