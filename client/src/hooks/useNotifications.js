import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../store/slices/notificationSlice';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return { notifications, unreadCount };
};