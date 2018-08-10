// @flow
type IdeaProps = {
  id?: string,
  boardId: string,
  name?: string,
  description?: ?string,
  ease?: number,
  confidence?: number,
  impact?: number,
}
export class Idea {
  id: string
  boardId: string
  name: string
  description: ?string
  ease: number
  confidence: number
  impact: number

  constructor(props: IdeaProps) {
    this.id = props.id || ""
    this.boardId = props.boardId
    this.name = props.name || ""
    this.description = props.description || ""
    this.ease = props.ease === 0 ? 0 : parseInt(props.ease, 10) || 5
    this.confidence =
      props.confidence === 0 ? 0 : parseInt(props.confidence, 10) || 5
    this.impact = props.impact === 0 ? 0 : parseInt(props.impact, 10) || 5
  }

  getAverage(): number {
    return Math.round((this.ease + this.confidence + this.impact) / 3)
  }

  toExport() {
    const obj = { ...this }
    // Remove private fields
    delete obj.id
    delete obj.boardId
    return obj
  }
}
