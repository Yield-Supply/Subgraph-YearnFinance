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

import { handleNewProposal, handleCreateProposal } from './handleNewProposal'
import { handleVote } from './handleVote'
import { handleProposalFinished } from './handleProposalFinished'
import { handleRegisterVoter } from './handleRegisterVoter'
import { handleRevokeVoter } from './handleRevokeVoter'
import { handleStaked } from './handleStaked'
import { handleWithdrawn } from './handleWithdrawn'
import { handleRewardPaid } from './handleRewardPaid'
import { handleRewardAdded } from './handleRewardAdded'
import {handleOwnershipTransferred} from './handleOwnershipTransferred'

export {
  handleNewProposal, handleCreateProposal, handleRevokeVoter,
  handleRegisterVoter, handleStaked, handleWithdrawn,handleOwnershipTransferred,
  handleVote, handleProposalFinished, handleRewardPaid, handleRewardAdded
}





