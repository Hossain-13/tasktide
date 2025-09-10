import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startTimer, stopTimer, togglePause } from '../store/slices/timerSlice';

export const useTimer = () => {
  const dispatch = useDispatch();
  const timer = useSelector((state) => state.timer);

  const start = useCallback(() => {
    dispatch(startTimer());
  }, [dispatch]);

  const stop = useCallback(() => {
    dispatch(stopTimer());
  }, [dispatch]);

  const pause = useCallback(() => {
    dispatch(togglePause());
  }, [dispatch]);

  return { ...timer, start, stop, pause };
};