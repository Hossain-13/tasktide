import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import assignmentService from '../../services/assignmentService';
import toast from 'react-hot-toast';

// Fetch assignments
export const fetchAssignments = createAsyncThunk(
  'assignments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await assignmentService.getAll();
      return response.data.assignments;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch assignments');
    }
  }
);

// Create assignment
export const createAssignment = createAsyncThunk(
  'assignments/create',
  async (assignmentData, { rejectWithValue }) => {
    try {
      const response = await assignmentService.create(assignmentData);
      toast.success('Assignment created successfully!');
      return response.data.assignment;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create assignment';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Update assignment
export const updateAssignment = createAsyncThunk(
  'assignments/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await assignmentService.update(id, data);
      toast.success('Assignment updated successfully!');
      return response.data.assignment;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update assignment';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Delete assignment
export const deleteAssignment = createAsyncThunk(
  'assignments/delete',
  async (id, { rejectWithValue }) => {
    try {
      await assignmentService.delete(id);
      toast.success('Assignment deleted successfully!');
      return id;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete assignment';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Complete assignment
export const completeAssignment = createAsyncThunk(
  'assignments/complete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await assignmentService.complete(id);
      toast.success('Assignment marked as complete!');
      return response.data.assignment;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to complete assignment';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const assignmentSlice = createSlice({
  name: 'assignments',
  initialState: {
    assignments: [],
    loading: false,
    error: null,
    filters: {
      status: 'all',
      priority: 'all',
      course: 'all',
      search: '',
    },
    sortBy: 'dueDate',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        priority: 'all',
        course: 'all',
        search: '',
      };
    },
  },
  extraReducers: (builder) => {
    // Fetch assignments
    builder.addCase(fetchAssignments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAssignments.fulfilled, (state, action) => {
      state.loading = false;
      state.assignments = action.payload;
    });
    builder.addCase(fetchAssignments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Create assignment
    builder.addCase(createAssignment.fulfilled, (state, action) => {
      state.assignments.push(action.payload);
    });

    // Update assignment
    builder.addCase(updateAssignment.fulfilled, (state, action) => {
      const index = state.assignments.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.assignments[index] = action.payload;
      }
    });

    // Delete assignment
    builder.addCase(deleteAssignment.fulfilled, (state, action) => {
      state.assignments = state.assignments.filter(a => a.id !== action.payload);
    });

    // Complete assignment
    builder.addCase(completeAssignment.fulfilled, (state, action) => {
      const index = state.assignments.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.assignments[index] = action.payload;
      }
    });
  },
});

export const { setFilter, setSortBy, clearFilters } = assignmentSlice.actions;
export default assignmentSlice.reducer;