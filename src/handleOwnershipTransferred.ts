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

export function handleOwnershipTransferred(event: OwnershipTransferred): void { 

    let history = getHistory()

    //Update History
    history.currentOwner = event.params.newOwner
    history.previousOwner = event.params.previousOwner
    history.blockOwnershipChange = event.block.number

    history.save()
}