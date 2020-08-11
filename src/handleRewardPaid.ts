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

export function handleRewardPaid(event: RewardPaid): void { 

    //Get History
    let history = getHistory()

    //Update History
    history.paidRewards = history.paidRewards.plus(event.params.reward)

    //Get User/Voter
    let user = getVoter(event.params.user.toHexString())

    //Update User
    user.paidReward = user.paidReward.plus(event.params.reward)

    //Save
    user.save()
    history.save()
}