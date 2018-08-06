// @flow
type BoardProps = {
  id: string,
  name: string,
  ownerId: string,
  roles?: {
    [string]: string,
  },
}

export class Board {
  id: string
  name: string
  ownerId: string
  roles: {
    [string]: string,
  }

  constructor(props: BoardProps) {
    this.id = props.id
    this.name = props.name
    this.ownerId = props.ownerId
    this.roles = props.roles || {}
  }
}
