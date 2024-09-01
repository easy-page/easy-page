import { useCallback, useEffect, useState } from 'react';
import { useTnStore } from '../store';

export const useEditorEmpty = (empty: boolean) => {
  const [beforeInput, setBeforeInput] = useTnStore().use.beforeInput();
  // console.log('get before input of：刷新', beforeInput);
  const [isEmpty, setIsEmpty] = useState(empty);
  useEffect(() => {
    if (beforeInput) {
      setIsEmpty(false);
    }
  }, [beforeInput]);

  const setIsEmptyHandler = useCallback(
    (empty: boolean) => {
      if (!empty) {
        // console.log('get before input of: 清空', beforeInput);
        /** 编辑器有内容了，清空 beforeInput */
        // setBeforeInput('');
        setIsEmpty(false);
        return;
      }

      if (empty && Boolean(beforeInput)) {
        // console.log('get before input of use 二次获取:', beforeInput);
        /** 编辑器没有内容， 但是有 beforeInput 则不为空 */
        setIsEmpty(false);
      } else {
        /** 编辑器无内容，也没有 beforeInput */
        setIsEmpty(true);
      }
    },
    [setIsEmpty, setBeforeInput, beforeInput]
  );
  return {
    beforeInput,
    setBeforeInput,
    isEmpty,
    setIsEmpty: setIsEmptyHandler,
  };
};
