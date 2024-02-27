export const linkedIssueDetails = {
  startDate: ''
};

export const TimelineMock = [{
  name: 'ST-2',
  id: 'ST-2',
  start: Date.UTC(2024, 1, 19),
  end: Date.UTC(2024, 1, 24),
  owner: 'Alex David'
}, {
  name: 'ST-3',
  start: Date.UTC(2024, 1, 23),
  end: Date.UTC(2024, 1, 25),
  dependency: 'ST-2',
  owner: 'William'
}];

export const DayMock = {
  startDate: 'Feb 19',
  dueDate: 'Feb 22'
};

export const issueMOCK = {
	"expand": "renderedFields,names,schema,operations,editmeta,changelog,versionedRepresentations,customfield_10010.requestTypePractice",
	"id": "10002",
	"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issue/10002",
	"key": "ST-3",
	"fields": {
		"statuscategorychangedate": "2024-02-22T11:47:43.473+0530",
		"issuetype": {
			"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issuetype/10001",
			"id": "10001",
			"description": "Tasks track small, distinct pieces of work.",
			"iconUrl": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
			"name": "Task",
			"subtask": false,
			"avatarId": 10318,
			"entityId": "31d3c290-69d0-415d-9240-e589217c2a42",
			"hierarchyLevel": 0
		},
		"parent": {
			"id": "10000",
			"key": "ST-1",
			"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issue/10000",
			"fields": {
				"summary": "Setup Env.",
				"status": {
					"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/status/10000",
					"description": "",
					"iconUrl": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/",
					"name": "To Do",
					"id": "10000",
					"statusCategory": {
						"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/statuscategory/2",
						"id": 2,
						"key": "new",
						"colorName": "blue-gray",
						"name": "To Do"
					}
				},
				"priority": {
					"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/priority/3",
					"iconUrl": "https://jiramsys.atlassian.net/images/icons/priorities/medium.svg",
					"name": "Medium",
					"id": "3"
				},
				"issuetype": {
					"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issuetype/10002",
					"id": "10002",
					"description": "Epics track collections of related bugs, stories, and tasks.",
					"iconUrl": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium",
					"name": "Epic",
					"subtask": false,
					"avatarId": 10307,
					"entityId": "9ae8f158-274a-4f79-84c3-74e4021f3e10",
					"hierarchyLevel": 1
				}
			}
		},
		"timespent": null,
		"project": {
			"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/project/10000",
			"id": "10000",
			"key": "ST",
			"name": "Sample Test",
			"projectTypeKey": "software",
			"simplified": true,
			"avatarUrls": {
				"48x48": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/universal_avatar/view/type/project/avatar/10425",
				"24x24": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/universal_avatar/view/type/project/avatar/10425?size=small",
				"16x16": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/universal_avatar/view/type/project/avatar/10425?size=xsmall",
				"32x32": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/universal_avatar/view/type/project/avatar/10425?size=medium"
			}
		},
		"customfield_10031": null,
		"customfield_10032": null,
		"fixVersions": [],
		"customfield_10034": null,
		"aggregatetimespent": null,
		"resolution": null,
		"customfield_10027": null,
		"customfield_10028": null,
		"customfield_10029": null,
		"resolutiondate": null,
		"workratio": -1,
		"issuerestriction": {
			"issuerestrictions": {},
			"shouldDisplay": true
		},
		"watches": {
			"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issue/ST-3/watchers",
			"watchCount": 0,
			"isWatching": false
		},
		"lastViewed": "2024-02-27T03:29:09.895+0530",
		"created": "2024-02-14T18:54:42.990+0530",
		"customfield_10020": null,
		"customfield_10021": null,
		"customfield_10022": null,
		"customfield_10023": null,
		"priority": {
			"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/priority/3",
			"iconUrl": "https://jiramsys.atlassian.net/images/icons/priorities/medium.svg",
			"name": "Medium",
			"id": "3"
		},
		"customfield_10024": null,
		"customfield_10025": null,
		"customfield_10026": null,
		"labels": [],
		"customfield_10016": null,
		"customfield_10017": null,
		"customfield_10018": {
			"hasEpicLinkFieldDependency": false,
			"showField": false,
			"nonEditableReason": {
				"reason": "PLUGIN_LICENSE_ERROR",
				"message": "The Parent Link is only available to Jira Premium users."
			}
		},
		"customfield_10019": "0|i0000f:",
		"aggregatetimeoriginalestimate": null,
		"timeestimate": null,
		"versions": [],
		"issuelinks": [{
			"id": "10001",
			"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issueLink/10001",
			"type": {
				"id": "10000",
				"name": "Blocks",
				"inward": "is blocked by",
				"outward": "blocks",
				"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issueLinkType/10000"
			},
			"outwardIssue": {
				"id": "10003",
				"key": "ST-4",
				"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issue/10003",
				"fields": {
					"summary": "Testing",
					"status": {
						"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/status/10000",
						"description": "",
						"iconUrl": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/",
						"name": "To Do",
						"id": "10000",
						"statusCategory": {
							"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/statuscategory/2",
							"id": 2,
							"key": "new",
							"colorName": "blue-gray",
							"name": "To Do"
						}
					},
					"priority": {
						"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/priority/3",
						"iconUrl": "https://jiramsys.atlassian.net/images/icons/priorities/medium.svg",
						"name": "Medium",
						"id": "3"
					},
					"issuetype": {
						"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issuetype/10001",
						"id": "10001",
						"description": "Tasks track small, distinct pieces of work.",
						"iconUrl": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
						"name": "Task",
						"subtask": false,
						"avatarId": 10318,
						"entityId": "31d3c290-69d0-415d-9240-e589217c2a42",
						"hierarchyLevel": 0
					}
				}
			}
		}, {
			"id": "10000",
			"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issueLink/10000",
			"type": {
				"id": "10000",
				"name": "Blocks",
				"inward": "is blocked by",
				"outward": "blocks",
				"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issueLinkType/10000"
			},
			"inwardIssue": {
				"id": "10001",
				"key": "ST-2",
				"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issue/10001",
				"fields": {
					"summary": "Spike - Analyse all dependencies",
					"status": {
						"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/status/10000",
						"description": "",
						"iconUrl": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/",
						"name": "To Do",
						"id": "10000",
						"statusCategory": {
							"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/statuscategory/2",
							"id": 2,
							"key": "new",
							"colorName": "blue-gray",
							"name": "To Do"
						}
					},
					"priority": {
						"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/priority/3",
						"iconUrl": "https://jiramsys.atlassian.net/images/icons/priorities/medium.svg",
						"name": "Medium",
						"id": "3"
					},
					"issuetype": {
						"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issuetype/10001",
						"id": "10001",
						"description": "Tasks track small, distinct pieces of work.",
						"iconUrl": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
						"name": "Task",
						"subtask": false,
						"avatarId": 10318,
						"entityId": "31d3c290-69d0-415d-9240-e589217c2a42",
						"hierarchyLevel": 0
					}
				}
			}
		}],
		"assignee": {
			"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/user?accountId=5f7445f9c594410077101034",
			"accountId": "5f7445f9c594410077101034",
			"emailAddress": "gsaleem@msystechnologies.com",
			"avatarUrls": {
				"48x48": "https://secure.gravatar.com/avatar/c1c5f534fef025862b6da6f9ebbd2509?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGS-3.png",
				"24x24": "https://secure.gravatar.com/avatar/c1c5f534fef025862b6da6f9ebbd2509?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGS-3.png",
				"16x16": "https://secure.gravatar.com/avatar/c1c5f534fef025862b6da6f9ebbd2509?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGS-3.png",
				"32x32": "https://secure.gravatar.com/avatar/c1c5f534fef025862b6da6f9ebbd2509?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGS-3.png"
			},
			"displayName": "Ghazala Saleem",
			"active": true,
			"timeZone": "Asia/Kolkata",
			"accountType": "atlassian"
		},
		"updated": "2024-02-23T14:53:42.507+0530",
		"status": {
			"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/status/10001",
			"description": "",
			"iconUrl": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/",
			"name": "In Progress",
			"id": "10001",
			"statusCategory": {
				"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/statuscategory/4",
				"id": 4,
				"key": "indeterminate",
				"colorName": "yellow",
				"name": "In Progress"
			}
		},
		"components": [],
		"timeoriginalestimate": null,
		"description": null,
		"customfield_10010": null,
		"customfield_10014": null,
		"timetracking": {},
		"customfield_10015": "2024-02-22",
		"customfield_10005": null,
		"customfield_10006": null,
		"customfield_10007": null,
		"security": null,
		"customfield_10008": null,
		"customfield_10009": null,
		"aggregatetimeestimate": null,
		"attachment": [],
		"summary": "Workspace Setup",
		"creator": {
			"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/user?accountId=5f7445f9c594410077101034",
			"accountId": "5f7445f9c594410077101034",
			"emailAddress": "gsaleem@msystechnologies.com",
			"avatarUrls": {
				"48x48": "https://secure.gravatar.com/avatar/c1c5f534fef025862b6da6f9ebbd2509?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGS-3.png",
				"24x24": "https://secure.gravatar.com/avatar/c1c5f534fef025862b6da6f9ebbd2509?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGS-3.png",
				"16x16": "https://secure.gravatar.com/avatar/c1c5f534fef025862b6da6f9ebbd2509?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGS-3.png",
				"32x32": "https://secure.gravatar.com/avatar/c1c5f534fef025862b6da6f9ebbd2509?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGS-3.png"
			},
			"displayName": "Ghazala Saleem",
			"active": true,
			"timeZone": "Asia/Kolkata",
			"accountType": "atlassian"
		},
		"subtasks": [],
		"reporter": {
			"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/user?accountId=5f7445f9c594410077101034",
			"accountId": "5f7445f9c594410077101034",
			"emailAddress": "gsaleem@msystechnologies.com",
			"avatarUrls": {
				"48x48": "https://secure.gravatar.com/avatar/c1c5f534fef025862b6da6f9ebbd2509?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGS-3.png",
				"24x24": "https://secure.gravatar.com/avatar/c1c5f534fef025862b6da6f9ebbd2509?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGS-3.png",
				"16x16": "https://secure.gravatar.com/avatar/c1c5f534fef025862b6da6f9ebbd2509?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGS-3.png",
				"32x32": "https://secure.gravatar.com/avatar/c1c5f534fef025862b6da6f9ebbd2509?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGS-3.png"
			},
			"displayName": "Ghazala Saleem",
			"active": true,
			"timeZone": "Asia/Kolkata",
			"accountType": "atlassian"
		},
		"aggregateprogress": {
			"progress": 0,
			"total": 0
		},
		"customfield_10001": null,
		"customfield_10002": null,
		"customfield_10003": null,
		"customfield_10004": null,
		"environment": null,
		"duedate": "2024-02-26",
		"progress": {
			"progress": 0,
			"total": 0
		},
		"votes": {
			"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issue/ST-3/votes",
			"votes": 0,
			"hasVoted": false
		},
		"comment": {
			"comments": [],
			"self": "https://api.atlassian.com/ex/jira/b762c4d8-cb39-44ec-9ef7-040b95c7c7b5/rest/api/3/issue/10002/comment",
			"maxResults": 0,
			"total": 0,
			"startAt": 0
		},
		"worklog": {
			"startAt": 0,
			"maxResults": 20,
			"total": 0,
			"worklogs": []
		}
	}
};