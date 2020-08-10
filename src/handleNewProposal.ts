import { BigInt } from "@graphprotocol/graph-ts"
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
  Withdrawn
} from "../generated/Contract/Contract"
import { Proposal } from "../generated/schema"
import {getProposal, getVoter, getHistory} from "./HELPERS"

export function handleNewProposal(event: NewProposal): void {
  
    let proposalId = event.params.id
    let creator = event.params.creator
    let start = event.params.start
    let duration = event.params.duration
    let executor = event.params.executor

    //Create a new Proposal
    let proposal = getProposal(proposalId.toHexString())
    //Create or fetch a new voter
    let voter = getVoter(creator.toHexString())

    //Create instance of Gov Contract to get data
    let contract = Contract.bind(event.address)
    let period = contract.period()
    let quorumRequired = contract.quorum()
    let totalVotes = contract.totalVotes()


    //Add data to Proposal
    proposal.timestamp = event.block.timestamp
    proposal.blockNumber = event.block.number
    proposal.startBlock = start
    proposal.endBlock = start.plus(period)
    proposal.quorumRequired = quorumRequired
    proposal.totalVotesAvailible = totalVotes
    proposal.open = true

    //Add this proposal to the Voter

    let proposedProposal = voter.proposalsProposed
    proposedProposal.push(proposal.id)
    voter.proposalsProposed = proposedProposal
    voter.proposalsParticipatedCount = voter.proposalsParticipatedCount.plus(BigInt.fromI32(1))

    //Get the history object
    let history = getHistory()

    history.totalProposalCount = history.totalProposalCount.plus(BigInt.fromI32(1))
    let historyOfProposal = history.allProposals
    historyOfProposal.push(proposal.id)
    history.allProposals = historyOfProposal

    //Save
    proposal.save()
    voter.save()
    history.save()

}