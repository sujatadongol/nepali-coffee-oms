function parseJSON(response, callback) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  if (response.status === 400) {
    return response
      .json()
      .then((parsedResponse) => {
        if (parsedResponse.error) {
          const error = {
            error: true,
            msg: parsedResponse.msg,
            errorCode: parsedResponse.errorCode,
            ...parsedResponse,
          };
          return error;
        }
        callback(parsedResponse, null);
      })
      .catch(() => {
        callback(null, "Exception on server");
      });
  }

  if (response.status === 200) {
    return response
      .json()
      .then((parsedResponse) => {
        if (parsedResponse?.response?.error) {
          const error = {
            error: true,
            msg: parsedResponse?.response?.msg,
            errorCode: parsedResponse?.response?.errorCode,
            ...parsedResponse,
          };
          if (parsedResponse?.response?.errorCode === 12) {
            sendMessageToParent();
          }
          return error;
        }
        return parsedResponse;
      })
      .catch(() => {
        callback(null, "Exception on server");
      });
  }
  return response.json();
}

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    if (response?.errorcode === 12) {
    }
    return response;
  }

  if (response.status === 401) {
  }

  const error = new Error();
  error.response = response;
  if (response.status === 400) {
    return response;
  }
  throw error;
}

export default function request(url, options) {
  if (navigator.onLine) {
    return fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .catch(() => checkStatus());
  }
}
