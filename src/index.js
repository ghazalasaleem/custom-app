import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';
const resolver = new Resolver();

resolver.define('fetchLinkedIssues', async ({payload, context}) => {
  const res = await api.asUser().requestJira(route`/rest/api/3/issue/${payload.key}`);
  const data = await res.json();
  return data;
});

resolver.define('fetchIssueDetails', async (req) => {
  const key = req.context.extension.issue.key;
  const res = await api.asUser().requestJira(route`/rest/api/3/issue/${key}`);
  const data = await res.json();
  return data;
});


var bodyData = `{
  "htmlBody": "The <strong>latest</strong> test results for this ticket are now available.",
  "restrict": {
    "groupIds": [],
    "groups": [
      {
        "name": "notification-group"
      }
    ],
    "permissions": [
      {
        "key": "BROWSE"
      }
    ]
  },
  "subject": "Latest test results",
  "textBody": "The latest test results for this ticket are now available.",
  "to": {
    "assignee": true,
    "groupIds": [],
    // "groups": [
    //   {
    //     "name": "notification-group"
    //   }
    // ],
    "reporter": false,
    // "users": [
    //   {
    //     "accountId": "5b10a2844c20165700ede21g",
    //     "active": false
    //   }
    // ],
    "voters": false,
    "watchers": true
  }
}`;
resolver.define('sendMail', async (req) => {
  const key = req.context.extension.issue.key;
  const response =  await api.asUser().requestJira(route`/rest/api/3/issue/${key}/notify`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: bodyData
});

const data = await response.json();
console.log(`Response: ${response.status} ${response.statusText}`);
console.log(data);
return data;
});


export const handler = resolver.getDefinitions();
