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
import { Proposal } from "../generated/schema"
import { getProposal, getVoter, getHistory } from "./HELPERS"

export function handleCreateProposal(event: ProposeCall): void {

    //Create instance of Gov Contract to get data
    let contract = Contract.bind(event.to)

    //Get the proposal count
    let count = contract.proposalCount()

    log.warning("The proposal count is: {} and hash is: {}", [count.toString(), event.inputs.hash])
    //Lets add
    let proposal = getProposal(count.toString())
    proposal.metadata = event.inputs.hash
    proposal.executor = event.inputs.executor

    proposal.save()
}

export function handleNewProposal(event: NewProposal): void {

    let proposalId = event.params.id
    let creator = event.params.creator
    let start = event.params.start
    let duration = event.params.duration
    let executor = event.params.executor

    //Create a new Proposal
    let proposal = getProposal(proposalId.toString())
    //Create or fetch a new voter
    let voter = getVoter(creator.toHexString())

    //Create instance of Gov Contract to get data
    let contract = Contract.bind(event.address)

    //Get Data - for the moment querying the proposals does not seem to work. 
    let period = contract.period()
    let quorumRequired = contract.quorum()
    let totalVotes = contract.totalVotes()

    //Get Prosposal
    let onChainProp = contract.proposals(proposalId)

    /*
        0 id   uint256 :  31
        1 proposer   address :  0x24394A4758DBdCf6fcbC14dc35af64Ac0D9a450A
        2 totalForVotes   uint256 :  3304526025479083265535
        3 totalAgainstVotes   uint256 :  4509585100000000000000
        4 start   uint256 :  10560736
        5 end   uint256 :  10578016
        6 executor   address :  0x0000000000000000000000000000000000000000
        7 hash   string :  https://raw.githubusercontent.com/iearn-finance/YIPS/master/YIPS/yip-31.md
        8 totalVotesAvailable   uint256 :  10641619951115285435544
        9 quorum   uint256 :  7342
        10 quorumRequired   uint256 :  2000
        11 open   bool :  false
  */

    // log.warning("The Hash value is: {}, quorumRequired: {}, proposalID: {}, executor: {} ", 
    // [onChainProp.value7, onChainProp.value10.toString(), onChainProp.value0.toString(), onChainProp.value6.toString()])
    //Add data to Proposal
    // proposal.timestamp = event.block.timestamp
    // proposal.blockNumber = event.block.number
    // proposal.metadata = onChainProp.value7 //hash
    // proposal.proposer = voter.id
    // proposal.startBlock = onChainProp.value4 //start
    // proposal.endBlock = onChainProp.value5 //end
    // proposal.open = onChainProp.value11 //Open
    // proposal.quorum = onChainProp.value9 //Quorum
    // proposal.quorumRequired = onChainProp.value10 //quorum required
    // proposal.totalVotesAvailible = onChainProp.value8 //totalVotesavailible
    // proposal.executor = onChainProp.value6
    //Add this proposal to the Voter

    proposal.timestamp = event.block.timestamp
    proposal.blockNumber = event.block.number
    proposal.metadata = onChainProp.value7 //hash
    proposal.proposer = voter.id
    proposal.startBlock = start //start
    proposal.endBlock = start.plus(period) //end
    proposal.open = true //Open
    proposal.quorum = BigInt.fromI32(0) //Quorum
    proposal.quorumRequired = quorumRequired //quorum required
    proposal.totalVotesAvailible = totalVotes //totalVotesavailible
    proposal.executor = event.params.executor


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