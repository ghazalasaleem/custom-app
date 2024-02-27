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

export const handler = resolver.getDefinitions();
