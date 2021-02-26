import localForage from 'localforage'

export async function handleHttpError(error) {
  const genericErrorMessage = 'Something Failed. Try again?'

  if (error.response && error.response.status === 401) {
    localForage
      .clear()
      .then(() => {
        window.location.replace('/')
      })
      .catch(err => {
        return err
      })
  }

  if (error.response && error.response.data) {
    return {
      statusCode: error.response.status,
      message:
        error.response.data.errorMessage || genericErrorMessage
    }
  }

  return {
    statusCode: 500,
    message: genericErrorMessage
  }
}
