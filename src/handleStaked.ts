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

export function handleStaked(event: Staked): void { 

    let staker = event.params.user
    let amount = event.params.amount

    //Get the User/voter
    let user = getVoter(staker.toHexString())

    //Get the history
    let history = getHistory()

    //Add stake information to Voter
    user.staking = true
    user.stakedAmount = amount

    //Add Stake information to history
    history.totalStakers = history.totalStakers.plus(BigInt.fromI32(1))
    history.totalStakedAmount = history.totalStakedAmount.plus(amount)

    //SAve
    user.save()
    history.save()
}