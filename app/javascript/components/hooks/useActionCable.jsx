import {useEffect, useMemo} from 'react';
import { createConsumer } from '@rails/actioncable';

const useActionCable = (url) => {
  const actionCable = useMemo(() => createConsumer(url), [url]);

  useEffect(() => {
    return () => {
      console.log('Disconnect Action Cable');
      actionCable.disconnect();
    };
  }, [actionCable]);

  return {actionCable};
};

export default useActionCable;