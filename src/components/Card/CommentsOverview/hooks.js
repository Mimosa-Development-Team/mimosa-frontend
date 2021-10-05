import { useMutation, useQuery } from 'react-query'
import { queryClient } from 'store/state'
import { toast } from 'material-react-toastify'
import { getCommentCountAPI } from '../Footer/api'
import { COMMENT_GET_COUNT_QUERY_KEY } from '../Footer/constants'

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
    data: commentCount,
    isLoading: commentCountIsLoading,
    error: commentCountError,
    refetch: getCommentCount,
    isSuccess: commentCountSuccess
  } = useQuery(
    [COMMENT_GET_COUNT_QUERY_KEY, { id }],
    getCommentCountAPI,
    {
      enabled: false
    }
  )

  const {
    data: addedComment,
    isLoading: addLoadingComment,
    error: addErrorComment,
    mutate: postMutate
  } = useMutation(postCommentAPI, {
    onSuccess: () => {
      refetch()
      getCommentCount()
      queryClient.invalidateQueries(COMMENT_POST_QUERY_KEY)
    }
  })

  const {
    data: updatedComment,
    isLoading: updateIsLoadingComment,
    error: updateErrorComment,
    mutate: updateMutate,
    isSuccess: updateIsSuccessComment,
    reset: resetCommentUpdate
  } = useMutation(putCommentAPI, {
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries(COMMENT_PUT_QUERY_KEY)
    }
  })

  const {
    data: deleteComment,
    isLoading: deleteIsLoadingComment,
    error: deleteErrorComment,
    mutate: deleteMutate,
    isSuccess: deleteIsSuccessComment,
    reset: resetCommentDelete
  } = useMutation(deleteCommentAPI, {
    onSuccess: () => {
      toast.success('Comment Deleted Success!')
      refetch()
      getCommentCount()
      queryClient.invalidateQueries(COMMENT_DELETE_QUERY_KEY)
    },
    onError: () => {
      toast.error('Error in Deleting Comment!')
    }
  })

  return {
    getComments: refetch,
    comments: data,
    isLoading,
    isSuccess,
    error,

    commentCount,
    commentCountIsLoading,
    commentCountError,
    getCommentCount,
    commentCountSuccess,

    addComment: postMutate,
    addedComment,
    addLoadingComment,
    addErrorComment,

    updateComment: updateMutate,
    updatedComment,
    updateIsLoadingComment,
    updateErrorComment,
    resetCommentUpdate,
    updateIsSuccessComment,

    deleteComment,
    deleteIsLoadingComment,
    deleteErrorComment,
    deleteMutate,
    resetCommentDelete,
    deleteIsSuccessComment
  }
}
