import { useMutation, useQuery } from 'react-query'
import { queryClient } from 'store/state'

import {
  getCommentsAPI,
  postCommentAPI,
  putCommentAPI,
  deleteCommentAPI
} from './api'
import {
  COMMENT_QUERY_KEY,
  COMMENT_POST_QUERY_KEY,
  COMMENT_PUT_QUERY_KEY,
  COMMENT_DELETE_QUERY_KEY
} from './constants'

export const useComments = id => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isSuccess
  } = useQuery([COMMENT_QUERY_KEY, { id }], getCommentsAPI, {
    enabled: false
  })

  const {
    data: addedComment,
    isLoading: addLoadingComment,
    error: addErrorComment,
    mutate: postMutate
  } = useMutation(postCommentAPI, {
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries(COMMENT_POST_QUERY_KEY)
    }
  })

  const {
    data: updatedComment,
    isLoading: updateIsLoadingComment,
    error: updateErrorComment,
    mutate: updateMutate,
    isSuccess: updateIsSuccessComment
  } = useMutation(putCommentAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(COMMENT_PUT_QUERY_KEY)
    }
  })

  const {
    data: deleteComment,
    isLoading: deleteIsLoadingComment,
    error: deleteErrorComment,
    mutate: deleteMutate,
    isSuccess: deleteIsSuccessComment
  } = useMutation(deleteCommentAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(COMMENT_DELETE_QUERY_KEY)
    }
  })

  return {
    getComments: refetch,
    comments: data,
    isLoading,
    isSuccess,
    error,

    addComment: postMutate,
    addedComment,
    addLoadingComment,
    addErrorComment,

    updateComment: updateMutate,
    updatedComment,
    updateIsLoadingComment,
    updateErrorComment,
    updateIsSuccessComment,

    deleteComment,
    deleteIsLoadingComment,
    deleteErrorComment,
    deleteMutate,
    deleteIsSuccessComment
  }
}
