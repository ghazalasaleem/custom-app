
export const OPEN_STATUSES = ['BACKLOG', 'TO DO', 'SELECTED FOR DEVELOPMENT'];

export const PROGRESS_STATUSES = ['IN PROGRESS', 'DEVELOPING', 'DEV COMPLETE', 'SCOPED FOR AC/EC', 'IN REVIEW', 'TESTING', 'BLOCKED'];
export const CLOSED_STATUS = ['DONE', 'CC READY', 'DUPLICATE_OBSOLETE_CANCELLED', 'CANCELLED', 'FCS', 'ACCEPTED'];

export const SHORT_DATE_FORMAT = "MMM dd";

export const OB_DEPENDENCY = "Out - bound Dependency";
export const IN_DEPENDENCY = "In - bound Dependency";
export const OVERDUE = "Overdue";

export const DAY = 24 * 36e5;
export const TODAY = Date.now();
export const IS_PARENT_TYPE= ['Epic', 'Initiative'];

export const STATUS_LIST = [{
  name: 'Open',
  wrapperStatuses: OPEN_STATUSES,
  customStyle: {
    backgroundColor: '#a7dbee',
    borderColor: '#049FD9',
    borderWidth: 2,
    borderStyle: 'solid'
  }
},
{
  name: 'In Progress',
  wrapperStatuses: PROGRESS_STATUSES,
  customStyle: {
    backgroundColor: '#049FD9',
    borderColor: '#049FD9',
    borderWidth: 2,
    borderStyle: 'solid'
  }
},
// {
//   name: 'Blocked',
//   wrapperStatuses : ['BLOCKED'],
//   customStyle: {
//     backgroundColor: '#e58a6d',

//   }
// },
// {
//   name: 'In Review',
//   wrapperStatuses : ['IN REVIEW', 'TESTING'],
//   customStyle: {
//     backgroundColor: '#8bc34a',

//   }
// },
{
  name: 'Completed',
  wrapperStatuses: CLOSED_STATUS,
  customStyle: {
    backgroundColor: '#53A828',
    // borderColor: '#049FD9',
    borderWidth: 2,
    borderStyle: 'solid'

  }
},
{
  name: 'Overdue',
  wrapperStatuses: [],
  customStyle: {
    backgroundColor: '#DC362E',
    // borderColor: '#049FD9',
    borderWidth: 2,
    borderStyle: 'solid'

  }
},
{
  name: 'EFD (estimated)',
  wrapperStatuses: [],
  customStyle: {
    backgroundColor: 'rgba(217, 178, 22, 1)',
    // borderColor: '#049FD9',
    borderWidth: 2,
    borderStyle: 'solid'

  }
}];
