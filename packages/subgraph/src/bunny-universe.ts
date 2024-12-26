import {
  AffiliateSell as AffiliateSellEvent,
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BatchMetadataUpdate as BatchMetadataUpdateEvent,
  ConsecutiveTransfer as ConsecutiveTransferEvent,
  ContractURIUpdated as ContractURIUpdatedEvent,
  DefaultRoyaltySet as DefaultRoyaltySetEvent,
  ImmutableTrait as ImmutableTraitEvent,
  Locked as LockedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TraitMetadataURIUpdated as TraitMetadataURIUpdatedEvent,
  TraitUpdated as TraitUpdatedEvent,
  TraitUpdatedList as TraitUpdatedListEvent,
  TraitUpdatedListUniformValue as TraitUpdatedListUniformValueEvent,
  TraitUpdatedRange as TraitUpdatedRangeEvent,
  TraitUpdatedRangeUniformValue as TraitUpdatedRangeUniformValueEvent,
  Transfer as TransferEvent,
  TransferValidatorUpdated as TransferValidatorUpdatedEvent,
  Unlocked as UnlockedEvent,
  UpdateUser as UpdateUserEvent,
} from "../generated/N2MERC721A/N2MERC721A";
import {
  AffiliateSell,
  Approval,
  ApprovalForAll,
  BatchMetadataUpdate,
  ConsecutiveTransfer,
  ContractURIUpdated,
  DefaultRoyaltySet,
  Holder,
  ImmutableTrait,
  Locked,
  OwnershipTransferred,
  Token,
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
} from "../generated/schema";
import { Address } from "@graphprotocol/graph-ts";

const ZERO_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000",
);

export function handleAffiliateSell(event: AffiliateSellEvent): void {
  const entity = new AffiliateSell(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.affiliate = event.params.affiliate;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApproval(event: ApprovalEvent): void {
  const entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  const entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBatchMetadataUpdate(
  event: BatchMetadataUpdateEvent,
): void {
  const entity = new BatchMetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.fromTokenId = event.params.fromTokenId;
  entity.toTokenId = event.params.toTokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleConsecutiveTransfer(
  event: ConsecutiveTransferEvent,
): void {
  const entity = new ConsecutiveTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.fromTokenId = event.params.fromTokenId;
  entity.toTokenId = event.params.toTokenId;
  entity.from = event.params.from;
  entity.to = event.params.to;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleContractURIUpdated(event: ContractURIUpdatedEvent): void {
  const entity = new ContractURIUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDefaultRoyaltySet(event: DefaultRoyaltySetEvent): void {
  const entity = new DefaultRoyaltySet(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.receiver = event.params.receiver;
  entity.feeNumerator = event.params.feeNumerator;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleImmutableTrait(event: ImmutableTraitEvent): void {
  const entity = new ImmutableTrait(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.traitKey = event.params.traitKey;
  entity.tokenId = event.params.tokenId;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleLocked(event: LockedEvent): void {
  const entity = new Locked(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  const entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTraitMetadataURIUpdated(
  event: TraitMetadataURIUpdatedEvent,
): void {
  const entity = new TraitMetadataURIUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTraitUpdated(event: TraitUpdatedEvent): void {
  const entity = new TraitUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.traitKey = event.params.traitKey;
  entity.tokenId = event.params.tokenId;
  entity.traitValue = event.params.traitValue;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTraitUpdatedList(event: TraitUpdatedListEvent): void {
  const entity = new TraitUpdatedList(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.traitKey = event.params.traitKey;
  entity.tokenIds = event.params.tokenIds;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTraitUpdatedListUniformValue(
  event: TraitUpdatedListUniformValueEvent,
): void {
  const entity = new TraitUpdatedListUniformValue(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.traitKey = event.params.traitKey;
  entity.tokenIds = event.params.tokenIds;
  entity.traitValue = event.params.traitValue;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTraitUpdatedRange(event: TraitUpdatedRangeEvent): void {
  const entity = new TraitUpdatedRange(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.traitKey = event.params.traitKey;
  entity.fromTokenId = event.params.fromTokenId;
  entity.toTokenId = event.params.toTokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTraitUpdatedRangeUniformValue(
  event: TraitUpdatedRangeUniformValueEvent,
): void {
  const entity = new TraitUpdatedRangeUniformValue(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.traitKey = event.params.traitKey;
  entity.fromTokenId = event.params.fromTokenId;
  entity.toTokenId = event.params.toTokenId;
  entity.traitValue = event.params.traitValue;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  const transferEntity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );

  const senderAddress = event.params.from;
  const receiverAddress = event.params.to;
  const tokenIdBigInt = event.params.tokenId;
  const tokenId = tokenIdBigInt.toString();
  const blockTimestamp = event.block.timestamp;

  transferEntity.from = senderAddress;
  transferEntity.to = receiverAddress;
  transferEntity.tokenId = tokenIdBigInt;

  transferEntity.blockNumber = event.block.number;
  transferEntity.blockTimestamp = event.block.timestamp;
  transferEntity.transactionHash = event.transaction.hash;

  transferEntity.save();

  // Load or create the Token entity
  let token = Token.load(tokenId);

  if (token) {
    token.owner = receiverAddress; // Update owner
  } else {
    token = new Token(tokenId); // Create a new Token entity
    token.owner = receiverAddress;
  }
  token.ownedSince = blockTimestamp; // Update ownership timestamp
  token.save();

  if (senderAddress.notEqual(ZERO_ADDRESS)) {
    const senderHolder = Holder.load(senderAddress);
    if (senderHolder) {
      senderHolder.balance -= 1;

      const updatedTokenIds: Array<string> = [];
      for (let i = 0; i < senderHolder.tokens.length; i++) {
        if (senderHolder.tokens[i] != tokenId) {
          updatedTokenIds.push(senderHolder.tokens[i]);
        }
      }
      senderHolder.tokens = updatedTokenIds;

      senderHolder.save();
    }
  }

  if (receiverAddress.notEqual(ZERO_ADDRESS)) {
    const receiverHolder = Holder.load(receiverAddress);
    if (receiverHolder) {
      receiverHolder.balance += 1;

      const updatedTokenIds: Array<string> = receiverHolder.tokens;
      updatedTokenIds.push(tokenId);
      receiverHolder.tokens = updatedTokenIds;

      receiverHolder.save();
    } else {
      const newReceiverHolder = new Holder(receiverAddress);
      newReceiverHolder.balance = 1;
      newReceiverHolder.tokens = [tokenId];

      newReceiverHolder.save();
    }
  }
}

export function handleTransferValidatorUpdated(
  event: TransferValidatorUpdatedEvent,
): void {
  const entity = new TransferValidatorUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.oldValidator = event.params.oldValidator;
  entity.newValidator = event.params.newValidator;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnlocked(event: UnlockedEvent): void {
  const entity = new Unlocked(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpdateUser(event: UpdateUserEvent): void {
  const entity = new UpdateUser(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.tokenId = event.params.tokenId;
  entity.user = event.params.user;
  entity.expires = event.params.expires;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
