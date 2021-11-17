import { useEffect, useState } from 'react';

export default function useList<ItemType>(
  initialList?: ItemType[]
): [ItemType[], boolean, React.Dispatch<React.SetStateAction<ItemType[]>>] {
  /* 列表 */
  const [list, setList] = useState(initialList || []);

  /* 列表是否为空 */
  const [isListEmpty, setIsListEmpty] = useState(false);

  useEffect(() => {
    setIsListEmpty(list.length === 0);
  }, [list]);

  return [list, isListEmpty, setList];
}
