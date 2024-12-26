import { newMockEvent } from "matchstick-as";
import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import {
  AffiliateSell,
  Approval,
  ApprovalForAll,
  BatchMetadataUpdate,
  ConsecutiveTransfer,
  ContractURIUpdated,
  DefaultRoyaltySet,
  ImmutableTrait,
  Locked,
  OwnershipTransferred,
  TraitMetadataURIUpdated,
  TraitUpdated,
  TraitUpdatedList,
  TraitUpdatedListUniformValue,
  TraitUpdatedRange,
  TraitUpdatedRangeUniformValue,
  Transfer,
  TransferValidatorUpdated,
  Unlocked,
  UpdateUser,
} from "../generated/N2MERC721A/N2MERC721A";

export function createAffiliateSellEvent(affiliate: Address): AffiliateSell {
  const affiliateSellEvent = changetype<AffiliateSell>(newMockEvent());

  affiliateSellEvent.parameters = [];

  affiliateSellEvent.parameters.push(
    new ethereum.EventParam("affiliate", ethereum.Value.fromAddress(affiliate)),
  );

  return affiliateSellEvent;
}

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt,
): Approval {
  const approvalEvent = changetype<Approval>(newMockEvent());

  approvalEvent.parameters = [];

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner)),
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved)),
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ),
  );

  return approvalEvent;
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean,
): ApprovalForAll {
  const approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent());

  approvalForAllEvent.parameters = [];

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner)),
  );
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator)),
  );
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved)),
  );

  return approvalForAllEvent;
}

export function createBatchMetadataUpdateEvent(
  fromTokenId: BigInt,
  toTokenId: BigInt,
): BatchMetadataUpdate {
  const batchMetadataUpdateEvent =
    changetype<BatchMetadataUpdate>(newMockEvent());

  batchMetadataUpdateEvent.parameters = [];

  batchMetadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "fromTokenId",
      ethereum.Value.fromUnsignedBigInt(fromTokenId),
    ),
  );
  batchMetadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "toTokenId",
      ethereum.Value.fromUnsignedBigInt(toTokenId),
    ),
  );

  return batchMetadataUpdateEvent;
}

export function createConsecutiveTransferEvent(
  fromTokenId: BigInt,
  toTokenId: BigInt,
  from: Address,
  to: Address,
): ConsecutiveTransfer {
  const consecutiveTransferEvent =
    changetype<ConsecutiveTransfer>(newMockEvent());

  consecutiveTransferEvent.parameters = [];

  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam(
      "fromTokenId",
      ethereum.Value.fromUnsignedBigInt(fromTokenId),
    ),
  );
  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam(
      "toTokenId",
      ethereum.Value.fromUnsignedBigInt(toTokenId),
    ),
  );
  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from)),
  );
  consecutiveTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to)),
  );

  return consecutiveTransferEvent;
}

export function createContractURIUpdatedEvent(): ContractURIUpdated {
  const contractUriUpdatedEvent =
    changetype<ContractURIUpdated>(newMockEvent());

  contractUriUpdatedEvent.parameters = [];

  return contractUriUpdatedEvent;
}

export function createDefaultRoyaltySetEvent(
  receiver: Address,
  feeNumerator: BigInt,
): DefaultRoyaltySet {
  const defaultRoyaltySetEvent = changetype<DefaultRoyaltySet>(newMockEvent());

  defaultRoyaltySetEvent.parameters = [];

  defaultRoyaltySetEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver)),
  );
  defaultRoyaltySetEvent.parameters.push(
    new ethereum.EventParam(
      "feeNumerator",
      ethereum.Value.fromUnsignedBigInt(feeNumerator),
    ),
  );

  return defaultRoyaltySetEvent;
}

export function createImmutableTraitEvent(
  traitKey: Bytes,
  tokenId: BigInt,
  value: Bytes,
): ImmutableTrait {
  const immutableTraitEvent = changetype<ImmutableTrait>(newMockEvent());

  immutableTraitEvent.parameters = [];

  immutableTraitEvent.parameters.push(
    new ethereum.EventParam(
      "traitKey",
      ethereum.Value.fromFixedBytes(traitKey),
    ),
  );
  immutableTraitEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ),
  );
  immutableTraitEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromFixedBytes(value)),
  );

  return immutableTraitEvent;
}

export function createLockedEvent(tokenId: BigInt): Locked {
  const lockedEvent = changetype<Locked>(newMockEvent());

  lockedEvent.parameters = [];

  lockedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ),
  );

  return lockedEvent;
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address,
): OwnershipTransferred {
  const ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent());

  ownershipTransferredEvent.parameters = [];

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner),
    ),
  );
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner)),
  );

  return ownershipTransferredEvent;
}

export function createTraitMetadataURIUpdatedEvent(): TraitMetadataURIUpdated {
  const traitMetadataUriUpdatedEvent =
    changetype<TraitMetadataURIUpdated>(newMockEvent());

  traitMetadataUriUpdatedEvent.parameters = [];

  return traitMetadataUriUpdatedEvent;
}

export function createTraitUpdatedEvent(
  traitKey: Bytes,
  tokenId: BigInt,
  traitValue: Bytes,
): TraitUpdated {
  const traitUpdatedEvent = changetype<TraitUpdated>(newMockEvent());

  traitUpdatedEvent.parameters = [];

  traitUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "traitKey",
      ethereum.Value.fromFixedBytes(traitKey),
    ),
  );
  traitUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ),
  );
  traitUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "traitValue",
      ethereum.Value.fromFixedBytes(traitValue),
    ),
  );

  return traitUpdatedEvent;
}

export function createTraitUpdatedListEvent(
  traitKey: Bytes,
  tokenIds: Array<BigInt>,
): TraitUpdatedList {
  const traitUpdatedListEvent = changetype<TraitUpdatedList>(newMockEvent());

  traitUpdatedListEvent.parameters = [];

  traitUpdatedListEvent.parameters.push(
    new ethereum.EventParam(
      "traitKey",
      ethereum.Value.fromFixedBytes(traitKey),
    ),
  );
  traitUpdatedListEvent.parameters.push(
    new ethereum.EventParam(
      "tokenIds",
      ethereum.Value.fromUnsignedBigIntArray(tokenIds),
    ),
  );

  return traitUpdatedListEvent;
}

export function createTraitUpdatedListUniformValueEvent(
  traitKey: Bytes,
  tokenIds: Array<BigInt>,
  traitValue: Bytes,
): TraitUpdatedListUniformValue {
  const traitUpdatedListUniformValueEvent =
    changetype<TraitUpdatedListUniformValue>(newMockEvent());

  traitUpdatedListUniformValueEvent.parameters = [];

  traitUpdatedListUniformValueEvent.parameters.push(
    new ethereum.EventParam(
      "traitKey",
      ethereum.Value.fromFixedBytes(traitKey),
    ),
  );
  traitUpdatedListUniformValueEvent.parameters.push(
    new ethereum.EventParam(
      "tokenIds",
      ethereum.Value.fromUnsignedBigIntArray(tokenIds),
    ),
  );
  traitUpdatedListUniformValueEvent.parameters.push(
    new ethereum.EventParam(
      "traitValue",
      ethereum.Value.fromFixedBytes(traitValue),
    ),
  );

  return traitUpdatedListUniformValueEvent;
}

export function createTraitUpdatedRangeEvent(
  traitKey: Bytes,
  fromTokenId: BigInt,
  toTokenId: BigInt,
): TraitUpdatedRange {
  const traitUpdatedRangeEvent = changetype<TraitUpdatedRange>(newMockEvent());

  traitUpdatedRangeEvent.parameters = [];

  traitUpdatedRangeEvent.parameters.push(
    new ethereum.EventParam(
      "traitKey",
      ethereum.Value.fromFixedBytes(traitKey),
    ),
  );
  traitUpdatedRangeEvent.parameters.push(
    new ethereum.EventParam(
      "fromTokenId",
      ethereum.Value.fromUnsignedBigInt(fromTokenId),
    ),
  );
  traitUpdatedRangeEvent.parameters.push(
    new ethereum.EventParam(
      "toTokenId",
      ethereum.Value.fromUnsignedBigInt(toTokenId),
    ),
  );

  return traitUpdatedRangeEvent;
}

export function createTraitUpdatedRangeUniformValueEvent(
  traitKey: Bytes,
  fromTokenId: BigInt,
  toTokenId: BigInt,
  traitValue: Bytes,
): TraitUpdatedRangeUniformValue {
  const traitUpdatedRangeUniformValueEvent =
    changetype<TraitUpdatedRangeUniformValue>(newMockEvent());

  traitUpdatedRangeUniformValueEvent.parameters = [];

  traitUpdatedRangeUniformValueEvent.parameters.push(
    new ethereum.EventParam(
      "traitKey",
      ethereum.Value.fromFixedBytes(traitKey),
    ),
  );
  traitUpdatedRangeUniformValueEvent.parameters.push(
    new ethereum.EventParam(
      "fromTokenId",
      ethereum.Value.fromUnsignedBigInt(fromTokenId),
    ),
  );
  traitUpdatedRangeUniformValueEvent.parameters.push(
    new ethereum.EventParam(
      "toTokenId",
      ethereum.Value.fromUnsignedBigInt(toTokenId),
    ),
  );
  traitUpdatedRangeUniformValueEvent.parameters.push(
    new ethereum.EventParam(
      "traitValue",
      ethereum.Value.fromFixedBytes(traitValue),
    ),
  );

  return traitUpdatedRangeUniformValueEvent;
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt,
): Transfer {
  const transferEvent = changetype<Transfer>(newMockEvent());

  transferEvent.parameters = [];

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from)),
  );
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to)),
  );
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ),
  );

  return transferEvent;
}

export function createTransferValidatorUpdatedEvent(
  oldValidator: Address,
  newValidator: Address,
): TransferValidatorUpdated {
  const transferValidatorUpdatedEvent =
    changetype<TransferValidatorUpdated>(newMockEvent());

  transferValidatorUpdatedEvent.parameters = [];

  transferValidatorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldValidator",
      ethereum.Value.fromAddress(oldValidator),
    ),
  );
  transferValidatorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newValidator",
      ethereum.Value.fromAddress(newValidator),
    ),
  );

  return transferValidatorUpdatedEvent;
}

export function createUnlockedEvent(tokenId: BigInt): Unlocked {
  const unlockedEvent = changetype<Unlocked>(newMockEvent());

  unlockedEvent.parameters = [];

  unlockedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ),
  );

  return unlockedEvent;
}

export function createUpdateUserEvent(
  tokenId: BigInt,
  user: Address,
  expires: BigInt,
): UpdateUser {
  const updateUserEvent = changetype<UpdateUser>(newMockEvent());

  updateUserEvent.parameters = [];

  updateUserEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ),
  );
  updateUserEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user)),
  );
  updateUserEvent.parameters.push(
    new ethereum.EventParam(
      "expires",
      ethereum.Value.fromUnsignedBigInt(expires),
    ),
  );

  return updateUserEvent;
}
