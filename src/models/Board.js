// @flow
import type { FirebaseTimestamp } from "../types/FirebaseTimestamp"

type BoardProps = {
  id?: string,
  name: string,
  ownerId: string,
  roles?: {
    [string]: string,
  },
  createdAt?: ?FirebaseTimestamp,
  modifiedAt?: ?FirebaseTimestamp,
}

export class Board {
  id: string
  name: string
  ownerId: string
  roles: {
    [string]: string,
  }
  createdAt: ?FirebaseTimestamp
  modifiedAt: ?FirebaseTimestamp

  constructor(props: BoardProps) {
    this.id = props.id || ""
    this.name = props.name
    this.ownerId = props.ownerId
    this.roles = props.roles || {}
    this.createdAt = props.createdAt || null
    this.modifiedAt = props.modifiedAt || null
  }

  isOwner(userId: string) {
    return userId === this.ownerId
  }

  isShared() {
    return Object.keys(this.roles).length > 0
  }

  toExport() {
    const obj = { ...this }
    // Remove private fields
    delete obj.id
    return obj
  }
}
