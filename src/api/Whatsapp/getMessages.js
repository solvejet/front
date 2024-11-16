import { apiClient } from "../axios";
export const getMessages = async (token, userId) => {
  try {
    const response = await apiClient.get(`/messages/history/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("getMessages", response);
    return { data: response?.data?.data, error: null }; // Assuming you want to return the response data
  } catch (error) {
    return { data: null, error };
  }
};
// response sammple : 16NOV:
// {
//   "data": {
//       "success": true,
//       "data": {
//           "messages": {
//               "messages": [
//                   {
//                       "_id": "67379bf52e6371856f66411f",
//                       "messageId": "msg_1731697653132_fc4ec612",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "direction": "OUTBOUND",
//                       "type": "MEDIA",
//                       "content": {
//                           "type": "MEDIA"
//                       },
//                       "status": "PENDING",
//                       "statusUpdates": [
//                           {
//                               "status": "PENDING",
//                               "timestamp": "2024-11-15T19:07:33.132Z"
//                           }
//                       ],
//                       "metadata": {
//                           "attempts": 0,
//                           "originalRequest": {
//                               "type": "MEDIA",
//                               "content": {
//                                   "type": "MEDIA",
//                                   "mediaType": "audio",
//                                   "mediaId": "1117061753354181",
//                                   "url": null,
//                                   "caption": "Check out this image!"
//                               }
//                           }
//                       },
//                       "createdAt": "2024-11-15T19:07:33.134Z",
//                       "updatedAt": "2024-11-15T19:07:33.134Z",
//                       "__v": 0
//                   },
//                   {
//                       "_id": "67379be32e6371856f6640ec",
//                       "messageId": "msg_1731697635567_3e7a3ee0",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "direction": "OUTBOUND",
//                       "type": "MEDIA",
//                       "content": {
//                           "type": "MEDIA"
//                       },
//                       "status": "DELIVERED",
//                       "statusUpdates": [
//                           {
//                               "status": "QUEUED",
//                               "timestamp": "2024-11-15T19:07:16.799Z"
//                           },
//                           {
//                               "status": "SENT",
//                               "timestamp": "2024-11-15T19:07:17.000Z"
//                           },
//                           {
//                               "status": "DELIVERED",
//                               "timestamp": "2024-11-15T19:07:17.000Z"
//                           }
//                       ],
//                       "metadata": {
//                           "attempts": 0,
//                           "originalRequest": {
//                               "type": "MEDIA",
//                               "content": {
//                                   "type": "MEDIA",
//                                   "mediaType": "image",
//                                   "mediaId": "1176225830764108",
//                                   "url": null,
//                                   "caption": "Check out this image!"
//                               }
//                           }
//                       },
//                       "createdAt": "2024-11-15T19:07:15.570Z",
//                       "updatedAt": "2024-11-15T19:07:20.002Z",
//                       "__v": 0,
//                       "whatsappId": "wamid.HBgMOTE4OTEwNzUwMDI2FQIAERgSRDRCMzk5N0UxRDVDREY5MTkwAA=="
//                   },
//                   {
//                       "_id": "67379bc82e6371856f6640b9",
//                       "messageId": "msg_1731697608854_389372eb",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "direction": "OUTBOUND",
//                       "type": "MEDIA",
//                       "content": {
//                           "type": "MEDIA"
//                       },
//                       "status": "SENT",
//                       "statusUpdates": [
//                           {
//                               "status": "QUEUED",
//                               "timestamp": "2024-11-15T19:06:49.890Z"
//                           },
//                           {
//                               "status": "DELIVERED",
//                               "timestamp": "2024-11-15T19:06:50.000Z"
//                           },
//                           {
//                               "status": "SENT",
//                               "timestamp": "2024-11-15T19:06:50.000Z"
//                           }
//                       ],
//                       "metadata": {
//                           "attempts": 0,
//                           "originalRequest": {
//                               "type": "MEDIA",
//                               "content": {
//                                   "type": "MEDIA",
//                                   "mediaType": "document",
//                                   "mediaId": "1563538204266874",
//                                   "url": null,
//                                   "caption": "Check out this image!"
//                               }
//                           }
//                       },
//                       "createdAt": "2024-11-15T19:06:48.856Z",
//                       "updatedAt": "2024-11-15T19:06:52.370Z",
//                       "__v": 0,
//                       "whatsappId": "wamid.HBgMOTE4OTEwNzUwMDI2FQIAERgSMDRGMURENkRCRkVEN0Y4NDEwAA=="
//                   },
//                   {
//                       "_id": "67379baa2e6371856f66408b",
//                       "messageId": "msg_1731697578183_2418901f",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "direction": "OUTBOUND",
//                       "type": "MEDIA",
//                       "content": {
//                           "type": "MEDIA"
//                       },
//                       "status": "FAILED",
//                       "statusUpdates": [
//                           {
//                               "status": "QUEUED",
//                               "timestamp": "2024-11-15T19:06:19.405Z"
//                           },
//                           {
//                               "status": "FAILED",
//                               "timestamp": "2024-11-15T19:06:19.000Z",
//                               "error": {
//                                   "code": 131053,
//                                   "title": "Media upload error",
//                                   "message": "Media upload error",
//                                   "details": "Unsupported Image mime type application/pdf. Please use one of image/png, image/jpeg."
//                               }
//                           }
//                       ],
//                       "metadata": {
//                           "attempts": 0,
//                           "originalRequest": {
//                               "type": "MEDIA",
//                               "content": {
//                                   "type": "MEDIA",
//                                   "mediaType": "image",
//                                   "mediaId": "1563538204266874",
//                                   "url": null,
//                                   "caption": "Check out this image!"
//                               }
//                           }
//                       },
//                       "createdAt": "2024-11-15T19:06:18.186Z",
//                       "updatedAt": "2024-11-15T19:06:21.601Z",
//                       "__v": 0,
//                       "whatsappId": "wamid.HBgMOTE4OTEwNzUwMDI2FQIAERgSMjY1QTE5MDNCNjQwMThGRDUyAA=="
//                   },
//                   {
//                       "_id": "673799072e6371856f663c7e",
//                       "messageId": "msg_1731696903320_c3e4f2cd",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "direction": "OUTBOUND",
//                       "type": "TEXT",
//                       "content": {
//                           "type": "TEXT",
//                           "text": "Hello Karan Shah, Your age is 12"
//                       },
//                       "status": "SENT",
//                       "statusUpdates": [
//                           {
//                               "status": "QUEUED",
//                               "timestamp": "2024-11-15T18:55:04.599Z"
//                           },
//                           {
//                               "status": "DELIVERED",
//                               "timestamp": "2024-11-15T18:55:05.000Z"
//                           },
//                           {
//                               "status": "SENT",
//                               "timestamp": "2024-11-15T18:55:04.000Z"
//                           }
//                       ],
//                       "metadata": {
//                           "attempts": 0,
//                           "originalRequest": {
//                               "type": "TEXT",
//                               "content": {
//                                   "type": "TEXT",
//                                   "text": "Hello Karan Shah, Your age is 12"
//                               }
//                           }
//                       },
//                       "createdAt": "2024-11-15T18:55:03.327Z",
//                       "updatedAt": "2024-11-15T18:55:06.926Z",
//                       "__v": 0,
//                       "whatsappId": "wamid.HBgMOTE4OTEwNzUwMDI2FQIAERgSNzQ1MzQxN0IwM0JEQjYyODE0AA=="
//                   },
//                   {
//                       "_id": "673791d6b05ac5ff0e80037f",
//                       "messageId": "msg_1731695062180_51ee5961",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "direction": "OUTBOUND",
//                       "type": "TEXT",
//                       "content": {
//                           "type": "TEXT",
//                           "text": "Hello Karan Shah, Your age is 0"
//                       },
//                       "status": "DELIVERED",
//                       "statusUpdates": [
//                           {
//                               "status": "PENDING",
//                               "timestamp": "2024-11-15T18:24:22.181Z"
//                           },
//                           {
//                               "status": "QUEUED",
//                               "timestamp": "2024-11-15T18:24:23.051Z"
//                           },
//                           {
//                               "status": "SENT",
//                               "timestamp": "2024-11-15T18:24:23.000Z"
//                           },
//                           {
//                               "status": "DELIVERED",
//                               "timestamp": "2024-11-15T18:24:23.000Z"
//                           }
//                       ],
//                       "metadata": {},
//                       "createdAt": "2024-11-15T18:24:22.183Z",
//                       "updatedAt": "2024-11-15T18:24:25.433Z",
//                       "__v": 0,
//                       "whatsappId": "wamid.HBgMOTE4OTEwNzUwMDI2FQIAERgSRkY2QTI5QjU5RjIwRDExRTlBAA=="
//                   },
//                   {
//                       "_id": "673791a9b05ac5ff0e800303",
//                       "messageId": "msg_1731695017843_b3b022f7",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "direction": "OUTBOUND",
//                       "type": "TEXT",
//                       "content": {
//                           "type": "TEXT",
//                           "text": "Hello Karan Shah, How are you?"
//                       },
//                       "status": "DELIVERED",
//                       "statusUpdates": [
//                           {
//                               "status": "PENDING",
//                               "timestamp": "2024-11-15T18:23:37.844Z"
//                           },
//                           {
//                               "status": "QUEUED",
//                               "timestamp": "2024-11-15T18:23:39.091Z"
//                           },
//                           {
//                               "status": "SENT",
//                               "timestamp": "2024-11-15T18:23:39.000Z"
//                           },
//                           {
//                               "status": "DELIVERED",
//                               "timestamp": "2024-11-15T18:23:39.000Z"
//                           }
//                       ],
//                       "metadata": {},
//                       "createdAt": "2024-11-15T18:23:37.855Z",
//                       "updatedAt": "2024-11-15T18:23:41.932Z",
//                       "__v": 0,
//                       "whatsappId": "wamid.HBgMOTE4OTEwNzUwMDI2FQIAERgSOERDRjM4NjcxQ0JFNkRENUZBAA=="
//                   },
//                   {
//                       "_id": "67378ff95e1981ae715f00b6",
//                       "messageId": "msg_1731694585690_617ce04a",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "direction": "OUTBOUND",
//                       "type": "TEXT",
//                       "content": {
//                           "type": "TEXT",
//                           "text": "Hello Karan Shah, How are you?"
//                       },
//                       "status": "PENDING",
//                       "statusUpdates": [
//                           {
//                               "status": "PENDING",
//                               "timestamp": "2024-11-15T18:16:25.691Z"
//                           }
//                       ],
//                       "metadata": {},
//                       "createdAt": "2024-11-15T18:16:25.693Z",
//                       "updatedAt": "2024-11-15T18:16:25.693Z",
//                       "__v": 0
//                   },
//                   {
//                       "_id": "67378fe95e1981ae715f008f",
//                       "messageId": "msg_1731694569358_de378839",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "direction": "OUTBOUND",
//                       "type": "TEXT",
//                       "content": {
//                           "type": "TEXT",
//                           "text": "Hello Karan Shah, How are you?"
//                       },
//                       "status": "PENDING",
//                       "statusUpdates": [
//                           {
//                               "status": "PENDING",
//                               "timestamp": "2024-11-15T18:16:09.358Z"
//                           }
//                       ],
//                       "metadata": {},
//                       "createdAt": "2024-11-15T18:16:09.364Z",
//                       "updatedAt": "2024-11-15T18:16:09.364Z",
//                       "__v": 0
//                   },
//                   {
//                       "_id": "673709eecf1ffb28ce7bea48",
//                       "messageId": "msg_1731660270376_174de983",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "direction": "OUTBOUND",
//                       "type": "TEXT",
//                       "content": {
//                           "text": "Hello! How can I help you today?"
//                       },
//                       "status": "SENT",
//                       "statusUpdates": [
//                           {
//                               "status": "PENDING",
//                               "timestamp": "2024-11-15T08:44:30.376Z"
//                           },
//                           {
//                               "status": "QUEUED",
//                               "timestamp": "2024-11-15T08:44:31.608Z"
//                           },
//                           {
//                               "status": "DELIVERED",
//                               "timestamp": "2024-11-15T08:44:32.000Z"
//                           },
//                           {
//                               "status": "DELIVERED",
//                               "timestamp": "2024-11-15T08:44:32.000Z"
//                           },
//                           {
//                               "status": "SENT",
//                               "timestamp": "2024-11-15T08:44:31.000Z"
//                           }
//                       ],
//                       "metadata": {},
//                       "createdAt": "2024-11-15T08:44:30.378Z",
//                       "updatedAt": "2024-11-15T08:44:34.886Z",
//                       "whatsappId": "wamid.HBgMOTE4OTEwNzUwMDI2FQIAERgSNEU4MEM4MTI0QzAwQThCNURGAA=="
//                   },
//                   {
//                       "_id": "673709a2cf1ffb28ce7be9b4",
//                       "messageId": "msg_1731660194048_h4jmpsuc5",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "whatsappId": "wamid.HBgMOTE4OTEwNzUwMDI2FQIAEhgWM0VCMDZCRDI5N0M4MEY3OUYzRERCNQA=",
//                       "direction": "INBOUND",
//                       "type": "TEXT",
//                       "content": {
//                           "text": "process"
//                       },
//                       "status": "DELIVERED",
//                       "statusUpdates": [
//                           {
//                               "status": "DELIVERED",
//                               "timestamp": "2024-11-15T08:43:11.000Z"
//                           }
//                       ],
//                       "metadata": {},
//                       "createdAt": "2024-11-15T08:43:14.053Z",
//                       "updatedAt": "2024-11-15T08:43:14.053Z"
//                   },
//                   {
//                       "_id": "6737086518e178c003512eb1",
//                       "messageId": "msg_1731659877868_usdyse3u4",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "whatsappId": "wamid.HBgMOTE4OTEwNzUwMDI2FQIAEhgWM0VCMDNERDkyQzNGNDQ2Q0U3OTBFMgA=",
//                       "direction": "INBOUND",
//                       "type": "TEXT",
//                       "content": {
//                           "text": "Hello Webhook"
//                       },
//                       "status": "DELIVERED",
//                       "statusUpdates": [
//                           {
//                               "status": "DELIVERED",
//                               "timestamp": "2024-11-15T08:37:55.000Z"
//                           }
//                       ],
//                       "metadata": {},
//                       "createdAt": "2024-11-15T08:37:57.874Z",
//                       "updatedAt": "2024-11-15T08:37:57.874Z"
//                   },
//                   {
//                       "_id": "6737037b2cddc3f55b134894",
//                       "messageId": "msg_1731658619218_b0fc06ac",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "direction": "OUTBOUND",
//                       "type": "TEXT",
//                       "content": {
//                           "text": "Hello! How can I help you today?"
//                       },
//                       "status": "SENT",
//                       "statusUpdates": [
//                           {
//                               "status": "PENDING",
//                               "timestamp": "2024-11-15T08:16:59.218Z"
//                           },
//                           {
//                               "status": "SENT",
//                               "timestamp": "2024-11-15T08:17:00.912Z"
//                           }
//                       ],
//                       "metadata": {},
//                       "createdAt": "2024-11-15T08:16:59.221Z",
//                       "updatedAt": "2024-11-15T08:17:00.912Z",
//                       "whatsappId": "wamid.HBgMOTE4OTEwNzUwMDI2FQIAERgSNURGNEYwQjc4NTNCNDVBNTNEAA=="
//                   },
//                   {
//                       "_id": "673702e1edc91e5e865f2521",
//                       "messageId": "msg_1731658465599_azwit5y3v",
//                       "conversationId": "673702e19792c3d68ee0bed7",
//                       "userId": "673395bbe97fb4d1c8c0f7e4",
//                       "direction": "OUTBOUND",
//                       "type": "TEXT",
//                       "content": {
//                           "text": "Hello! How can I help you today?"
//                       },
//                       "status": "FAILED",
//                       "statusUpdates": [
//                           {
//                               "status": "PENDING",
//                               "timestamp": "2024-11-15T08:14:25.599Z"
//                           },
//                           {
//                               "status": "FAILED",
//                               "timestamp": "2024-11-15T08:14:25.606Z",
//                               "error": "Invalid message format"
//                           }
//                       ],
//                       "metadata": {},
//                       "createdAt": "2024-11-15T08:14:25.602Z",
//                       "updatedAt": "2024-11-15T08:14:25.606Z"
//                   }
//               ],
//               "messageWindow": {
//                   "isWithinWindow": false,
//                   "timeRemaining": 0,
//                   "lastMessageAt": "2024-11-15T08:43:14.053Z",
//                   "windowExpiry": "2024-11-16T08:43:14.053Z"
//               },
//               "pagination": {
//                   "hasMore": false,
//                   "nextBefore": "2024-11-15T08:14:25.602Z",
//                   "nextMessageId": "msg_1731658465599_azwit5y3v"
//               }
//           },
//           "pagination": {
//               "hasMore": false
//           }
//       }
//   },
//   "status": 200,
//   "statusText": "OK",
//   "headers": {
//       "content-type": "application/json; charset=utf-8"
//   },
//   "config": {
//       "transitional": {
//           "silentJSONParsing": true,
//           "forcedJSONParsing": true,
//           "clarifyTimeoutError": false
//       },
//       "adapter": [
//           "xhr",
//           "http",
//           "fetch"
//       ],
//       "transformRequest": [
//           null
//       ],
//       "transformResponse": [
//           null
//       ],
//       "timeout": 0,
//       "xsrfCookieName": "XSRF-TOKEN",
//       "xsrfHeaderName": "X-XSRF-TOKEN",
//       "maxContentLength": -1,
//       "maxBodyLength": -1,
//       "env": {},
//       "headers": {
//           "Accept": "application/json, text/plain, */*",
//           "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzIzMWE5OTc5MmMzZDY4ZWUwYmVjNSIsInJvbGUiOiJTdXBlciBBZG1pbiIsInBlcm1pc3Npb25zIjpbeyJuYW1lIjoiY3JlYXRlX2FkbWluIiwiYWxsb3dlZCI6dHJ1ZSwiX2lkIjoiNjczMzg5ZjZkNjE3MjAzNzU0Yjc5OGZlIn0seyJuYW1lIjoidXBkYXRlX2FkbWluIiwiYWxsb3dlZCI6dHJ1ZSwiX2lkIjoiNjczMzg5ZjZkNjE3MjAzNzU0Yjc5OGZmIn0seyJuYW1lIjoiZGVsZXRlX2FkbWluIiwiYWxsb3dlZCI6dHJ1ZSwiX2lkIjoiNjczMzg5ZjZkNjE3MjAzNzU0Yjc5OTAwIn0seyJuYW1lIjoicmVhZF9hZG1pbiIsImFsbG93ZWQiOnRydWUsIl9pZCI6IjY3MzM4OWY2ZDYxNzIwMzc1NGI3OTkwMSJ9LHsibmFtZSI6ImNyZWF0ZV91c2VyIiwiYWxsb3dlZCI6dHJ1ZSwiX2lkIjoiNjczMzg5ZjZkNjE3MjAzNzU0Yjc5OTAyIn0seyJuYW1lIjoidXBkYXRlX3VzZXIiLCJhbGxvd2VkIjp0cnVlLCJfaWQiOiI2NzMzODlmNmQ2MTcyMDM3NTRiNzk5MDMifSx7Im5hbWUiOiJkZWxldGVfdXNlciIsImFsbG93ZWQiOnRydWUsIl9pZCI6IjY3MzM4OWY2ZDYxNzIwMzc1NGI3OTkwNCJ9LHsibmFtZSI6InJlYWRfdXNlciIsImFsbG93ZWQiOnRydWUsIl9pZCI6IjY3MzM4OWY2ZDYxNzIwMzc1NGI3OTkwNSJ9LHsibmFtZSI6Im1hbmFnZV9zY2hlbWEiLCJhbGxvd2VkIjp0cnVlLCJfaWQiOiI2NzMzODlmNmQ2MTcyMDM3NTRiNzk5MDYifSx7Im5hbWUiOiJhZGRfc2NoZW1hIiwiYWxsb3dlZCI6dHJ1ZSwiX2lkIjoiNjczMzg5ZjZkNjE3MjAzNzU0Yjc5OTA3In0seyJuYW1lIjoiY3JlYXRlX3JvbGUiLCJhbGxvd2VkIjp0cnVlLCJfaWQiOiI2NzMzODlmNmQ2MTcyMDM3NTRiNzk5MDgifSx7Im5hbWUiOiJ1cGRhdGVfcm9sZSIsImFsbG93ZWQiOnRydWUsIl9pZCI6IjY3MzM4OWY2ZDYxNzIwMzc1NGI3OTkwOSJ9LHsibmFtZSI6ImRlbGV0ZV9yb2xlIiwiYWxsb3dlZCI6dHJ1ZSwiX2lkIjoiNjczMzg5ZjZkNjE3MjAzNzU0Yjc5OTBhIn0seyJuYW1lIjoicmVhZF9yb2xlIiwiYWxsb3dlZCI6dHJ1ZSwiX2lkIjoiNjczMzg5ZjZkNjE3MjAzNzU0Yjc5OTBiIn0seyJuYW1lIjoibWFuYWdlX3JvbGUiLCJhbGxvd2VkIjp0cnVlLCJfaWQiOiI2NzMzODlmNmQ2MTcyMDM3NTRiNzk5MGMifSx7Im5hbWUiOiJtYW5hZ2VfZ3JvdXBzIiwiYWxsb3dlZCI6dHJ1ZSwiX2lkIjoiNjczMzg5ZjZkNjE3MjAzNzU0Yjc5OTBkIn0seyJuYW1lIjoicmVhZF9ncm91cHMiLCJhbGxvd2VkIjp0cnVlLCJfaWQiOiI2NzMzODlmNmQ2MTcyMDM3NTRiNzk5MGUifSx7Im5hbWUiOiJjcmVhdGVfZ3JvdXBzIiwiYWxsb3dlZCI6dHJ1ZSwiX2lkIjoiNjczMzg5ZjZkNjE3MjAzNzU0Yjc5OTBmIn0seyJuYW1lIjoidXBkYXRlX2dyb3VwcyIsImFsbG93ZWQiOnRydWUsIl9pZCI6IjY3MzM4OWY2ZDYxNzIwMzc1NGI3OTkxMCJ9LHsibmFtZSI6ImRlbGV0ZV9ncm91cHMiLCJhbGxvd2VkIjp0cnVlLCJfaWQiOiI2NzMzODlmNmQ2MTcyMDM3NTRiNzk5MTEifSx7Im5hbWUiOiJhc3NpZ25fdXNlciIsImFsbG93ZWQiOnRydWUsIl9pZCI6IjY3MzM4OWY2ZDYxNzIwMzc1NGI3OTkxMiJ9LHsibmFtZSI6ImFzc2lnbl90b19vdGhlcl9hZG1pbiIsImFsbG93ZWQiOnRydWUsIl9pZCI6IjY3MzM4OWY2ZDYxNzIwMzc1NGI3OTkxMyJ9LHsibmFtZSI6InVuYXNzaWduX3VzZXIiLCJhbGxvd2VkIjp0cnVlLCJfaWQiOiI2NzMzODlmNmQ2MTcyMDM3NTRiNzk5MTQifSx7Im5hbWUiOiJ1bmFzc2lnbl9mcm9tX290aGVyX2FkbWluIiwiYWxsb3dlZCI6dHJ1ZSwiX2lkIjoiNjczMzg5ZjZkNjE3MjAzNzU0Yjc5OTE1In0seyJuYW1lIjoidmlld19hc3NpZ25lZF91c2VycyIsImFsbG93ZWQiOnRydWUsIl9pZCI6IjY3MzM4OWY2ZDYxNzIwMzc1NGI3OTkxNiJ9LHsibmFtZSI6InZpZXdfb3RoZXJfYWRtaW5fdXNlcnMiLCJhbGxvd2VkIjp0cnVlLCJfaWQiOiI2NzMzODlmNmQ2MTcyMDM3NTRiNzk5MTcifSx7Im5hbWUiOiJzZW5kX21lc3NhZ2UiLCJhbGxvd2VkIjp0cnVlLCJfaWQiOiI2NzMzODlmNmQ2MTcyMDM3NTRiNzk5MTgifSx7Im5hbWUiOiJyZWFkX2NoYXQiLCJhbGxvd2VkIjp0cnVlLCJfaWQiOiI2NzMzODlmNmQ2MTcyMDM3NTRiNzk5MTkifSx7Im5hbWUiOiJtYW5hZ2Vfc2NoZW1hIiwiYWxsb3dlZCI6dHJ1ZSwiX2lkIjoiNjczMzg5ZjZkNjE3MjAzNzU0Yjc5OTFhIn0seyJuYW1lIjoicmVhZF9zY2hlbWEiLCJhbGxvd2VkIjp0cnVlLCJfaWQiOiI2NzMzODlmNmQ2MTcyMDM3NTRiNzk5MWIifSx7Im5hbWUiOiJzZW5kX2J1bGtfbWVzc2FnZSIsImFsbG93ZWQiOnRydWUsIl9pZCI6IjY3MzM4OWY2ZDYxNzIwMzc1NGI3OTkxYyJ9LHsibmFtZSI6InVwbG9hZF9tZWRpYSIsImFsbG93ZWQiOnRydWUsIl9pZCI6IjY3MzM4OWY2ZDYxNzIwMzc1NGI3OTkxZCJ9XSwiaWF0IjoxNzMxNzYwMzIxLCJleHAiOjE3MzE4NDY3MjF9.l-Q_fRp1acyAekOWTHl7kslU6fGTK-U11WuYm9LfRyU"
//       },
//       "baseURL": "https://api.pixe.in/api",
//       "method": "get",
//       "url": "/messages/history/673395bbe97fb4d1c8c0f7e4"
//   },
//   "request": {}
// }
