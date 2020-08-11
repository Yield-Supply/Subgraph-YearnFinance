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

export function handleWithdrawn(event: Withdrawn): void { 

    //Get amount
    let amount = event.params.amount
    //Get User
    let user = getVoter(event.params.user.toHexString())
    //Get History
    let history = getHistory()

    //Subtract from user
    user.voteCount = user.voteCount.minus(amount)

    //Subtract from History
    history.totalVotes = history.totalVotes.minus(amount)

    //Save user
    user.save()
    //Save History
    history.save()

}