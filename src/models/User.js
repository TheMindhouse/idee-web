// @flow

type UserProps = {
  id: string,
  name: ?string,
  email: ?string,
  avatarUrl: ?string,
}

export class User {
  id: string
  name: ?string
  email: ?string
  avatarUrl: ?string

  constructor(props: UserProps) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.avatarUrl = props.avatarUrl
  }

  toExport() {
    const objectToExport = { ...this }
    delete objectToExport.id
    return objectToExport
  }
}
