import { useMutation, useQuery } from 'react-query'
import { queryClient } from 'store/state'

import {
  getNotificationList,
  deleteNotificationSingle,
  deleteNotificationAll,
  putEmail
} from './api'
import {
  NOTIFICATION_GET,
  NOTIFICATION_PUT_EMAIL,
  NOTIFICATION_DELETE_SINGLE,
  NOTIFICATION_DELETE_ALL
} from './constants'

export const useNotification = id => {
  const {
    data: notification,
    isLoading: notificationIsLoading,
    error: notificationError,
    refetch: notificationRefetch,
    isSuccess: notificationSuccess
  } = useQuery(NOTIFICATION_GET, getNotificationList, {
    enabled: false
  })

  const {
    data: updatedEmail,
    isLoading: updateIsLoading,
    error: updateError,
    mutate: updateEmail
  } = useMutation(putEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries(NOTIFICATION_PUT_EMAIL)
    }
  })

  const {
    data: deletedNotificationSingle,
    isLoading: deleteIsLoadingNotificationSingle,
    error: deleteErrorNotificationSingle,
    mutate: deleteNotificationSingleMutate,
    isSuccess: deleteIsSuccessNotificationSingle,
    reset: resetNotificationSingleDelete
  } = useMutation(() => deleteNotificationSingle(id), {
    onSuccess: () => {
      notificationRefetch()
      queryClient.invalidateQueries(NOTIFICATION_DELETE_SINGLE)
    }
  })

  const {
    data: deletedNotificationAll,
    isLoading: deleteIsLoadingNotificationAll,
    error: deleteErrorNotificationAll,
    mutate: deleteNotificationAllMutate,
    isSuccess: deleteIsSuccessNotificationAll,
    reset: resetNotificationAllDelete
  } = useMutation(deleteNotificationAll, {
    onSuccess: () => {
      notificationRefetch()
      queryClient.invalidateQueries(NOTIFICATION_DELETE_ALL)
    }
  })

  return {
    notification,
    notificationIsLoading,
    notificationError,
    notificationRefetch,
    notificationSuccess,

    updatedEmail,
    updateIsLoading,
    updateError,
    updateEmail,

    deletedNotificationSingle,
    deleteIsLoadingNotificationSingle,
    deleteErrorNotificationSingle,
    deleteNotificationSingleMutate,
    deleteIsSuccessNotificationSingle,
    resetNotificationSingleDelete,

    deletedNotificationAll,
    deleteIsLoadingNotificationAll,
    deleteErrorNotificationAll,
    deleteNotificationAllMutate,
    deleteIsSuccessNotificationAll,
    resetNotificationAllDelete
  }
}