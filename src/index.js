import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';
import { OVERDUE } from '../static/hello-world/src/utils/constants';
const resolver = new Resolver();

resolver.define('fetchLinkedIssues', async ({ payload, context }) => {
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

const getEmailData = ({ text, accountId, active }) => {
  return {
    "htmlBody": text,
    "subject": "JIRA Issue Status",
    "textBody": text,
    "to": {
      "assignee": false,
      "groupIds": [],
      "reporter": false,
      "users": [
        {
          "accountId": accountId,
          "active": active
        }
      ],
      "voters": false,
      "watchers": false
    }
  };
};
resolver.define('sendMail', async (req) => {
  const key = req.context.extension.issue.key;
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${key}/notify`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(getEmailData(req.payload))
  });

  return response;
});

const getLabelUpdateData = (val) => {
  return {
    "update": {
      "labels": [
        {
          "add": OVERDUE
        },
      ],
    }
  };
};
resolver.define('updateLabel', async (req) => {
  const key = req.context.extension.issue.key;
  console.log(JSON.stringify(getLabelUpdateData(req.payload)));
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${key}?notifyUsers=true&returnIssue=true`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(getLabelUpdateData(req.payload))
  });
  return response;
});


export const handler = resolver.getDefinitions();
