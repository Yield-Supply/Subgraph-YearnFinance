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

export function handleProposalFinished(event: ProposalFinished): void { 

    //Get the proposal
    let proposal = getProposal(event.params.id.toString())

    //Get the outcome
    let forVotes = event.params._for
    let againstVotes = event.params._against
    let quorumReached = event.params.quorumReached
  
    //Add updates to Proposal
    proposal.forVotes = forVotes
    proposal.againstVotes = againstVotes
    proposal.quorumReached = quorumReached
    proposal.open = false

    proposal.save()

}