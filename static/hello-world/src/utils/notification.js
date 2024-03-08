import { showFlag } from '@forge/bridge';

/**
 * action syntax - [
 *       {
 *        text: 'Flag action',
 *          onClick: () => {
 *            console.log('flag action clicked');
 *          },
 *        }
 *      ]
 *  
 * */  
export const showNotification = ({show, id, title='', type='info', description='', actions = null}) => {
  if (show) {
    const flag = showFlag({
      id: id || 'success-flag',
      title: title,
      type: type,
      description: description,
      actions: actions,
      isAutoDismiss: true,
    });
    return flag;
  }
};

// flag.close();