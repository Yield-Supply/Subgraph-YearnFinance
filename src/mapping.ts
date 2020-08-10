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
import { ExampleEntity } from "../generated/schema"

export function handleNewProposal(event: NewProposal): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.id = event.params.id
  entity.creator = event.params.creator

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DURATION(...)
  // - contract.balanceOf(...)
  // - contract.breaker(...)
  // - contract.config(...)
  // - contract.earned(...)
  // - contract.getStats(...)
  // - contract.governance(...)
  // - contract.isOwner(...)
  // - contract.lastTimeRewardApplicable(...)
  // - contract.lastUpdateTime(...)
  // - contract.lock(...)
  // - contract.minimum(...)
  // - contract.owner(...)
  // - contract.period(...)
  // - contract.periodFinish(...)
  // - contract.proposalCount(...)
  // - contract.proposals(...)
  // - contract.quorum(...)
  // - contract.rewardPerToken(...)
  // - contract.rewardPerTokenStored(...)
  // - contract.rewardRate(...)
  // - contract.rewards(...)
  // - contract.token(...)
  // - contract.totalSupply(...)
  // - contract.totalVotes(...)
  // - contract.userRewardPerTokenPaid(...)
  // - contract.vote(...)
  // - contract.voteLock(...)
  // - contract.voters(...)
  // - contract.votes(...)
  // - contract.votesOf(...)
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleProposalFinished(event: ProposalFinished): void {}

export function handleRegisterVoter(event: RegisterVoter): void {}

export function handleRevokeVoter(event: RevokeVoter): void {}

export function handleRewardAdded(event: RewardAdded): void {}

export function handleRewardPaid(event: RewardPaid): void {}

export function handleStaked(event: Staked): void {}

export function handleVote(event: Vote): void {}

export function handleWithdrawn(event: Withdrawn): void {}
