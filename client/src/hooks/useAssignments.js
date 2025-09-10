import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignments } from '../store/slices/assignmentSlice';

export const useAssignments = () => {
  const dispatch = useDispatch();
  const { assignments, loading, error } = useSelector((state) => state.assignments);

  useEffect(() => {
    if (assignments.length === 0) {
      dispatch(fetchAssignments());
    }
  }, [dispatch, assignments.length]);

  return { assignments, loading, error };
};