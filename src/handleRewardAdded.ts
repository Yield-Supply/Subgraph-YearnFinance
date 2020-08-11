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

export function handleRewardAdded(event: RewardAdded): void { 

    //Get history
    let history = getHistory()

    //Add Reward
    history.totalReward = history.totalReward.plus(event.params.reward)

    //Save History
    history.save()
}