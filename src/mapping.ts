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

import { handleNewProposal } from './handleNewProposal'

export { handleNewProposal }

export function handleOwnershipTransferred(event: OwnershipTransferred): void { }

export function handleProposalFinished(event: ProposalFinished): void { }

export function handleRegisterVoter(event: RegisterVoter): void { }

export function handleRevokeVoter(event: RevokeVoter): void { }

export function handleRewardAdded(event: RewardAdded): void { }

export function handleRewardPaid(event: RewardPaid): void { }

export function handleStaked(event: Staked): void { }

export function handleVote(event: Vote): void { }

export function handleWithdrawn(event: Withdrawn): void { }
