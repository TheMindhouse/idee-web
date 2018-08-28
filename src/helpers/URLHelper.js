// @flow
export const URLHelper = {
  homepage: "/",
  login: "/login",
  pageNotFound: "/404",
  board: (boardId: string) => `/board/${boardId}`,
  boardNew: "/board/new",
  boardEdit: (boardId: string) => `/board/${boardId}/edit`,
  idea: (boardId: string, ideaId: string) => `/board/${boardId}/idea/${ideaId}`,
  ideaNew: (boardId: string) => `/board/${boardId}/idea/new`,
  ideaEdit: (boardId: string, ideaId: string) =>
    `/board/${boardId}/idea/${ideaId}/edit`,
}
