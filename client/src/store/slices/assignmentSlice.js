import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import assignmentService from '../../services/assignmentService';

// Async thunks
export const fetchAssignments = createAsyncThunk(
  'assignments/fetchAssignments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await assignmentService.fetchAssignments();
      return response.data.assignments || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch assignments');
    }
  }
);

export const createAssignment = createAsyncThunk(
  'assignments/createAssignment',
  async (assignmentData, { rejectWithValue }) => {
    try {
      const response = await assignmentService.createAssignment(assignmentData);
      return response.data.assignment || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create assignment');
    }
  }
);

export const updateAssignment = createAsyncThunk(
  'assignments/updateAssignment',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await assignmentService.updateAssignment(id, data);
      return response.data.assignment || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update assignment');
    }
  }
);

export const deleteAssignment = createAsyncThunk(
  'assignments/deleteAssignment',
  async (id, { rejectWithValue }) => {
    try {
      await assignmentService.deleteAssignment(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete assignment');
    }
  }
);

export const completeAssignment = createAsyncThunk(
  'assignments/completeAssignment',
  async (assignmentId, { rejectWithValue }) => {
    try {
      const response = await assignmentService.completeAssignment(assignmentId);
      return response.data.assignment || { id: assignmentId, status: 'completed' };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to complete assignment');
    }
  }
);

const initialState = {
  assignments: [],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    priority: 'all',
    search: '',
  },
  sortBy: 'dueDate_asc',
};

const assignmentSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignments.push(action.payload);
    },
    updateAssignmentLocal: (state, action) => {
      const index = state.assignments.findIndex(
        a => a._id === action.payload._id || a.id === action.payload.id
      );
      if (index !== -1) {
        state.assignments[index] = { ...state.assignments[index], ...action.payload };
      }
    },
    removeAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        a => a._id !== action.payload && a.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.filters = { status: 'all', priority: 'all', search: '' };
      state.sortBy = 'dueDate_asc';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.loading = false;
        const newAssignment = {
          id: action.payload.id || action.payload._id,
          _id: action.payload._id || action.payload.id,
          title: action.payload.title || '',
          description: action.payload.description || '',
          status: action.payload.status || 'pending',
          priority: action.payload.priority || 'medium',
          dueDate: action.payload.dueDate || null,
        };
        state.assignments.push(newAssignment);
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.assignments.findIndex(
          a => a._id === action.payload._id || a.id === action.payload.id
        );
        if (index !== -1) {
          state.assignments[index] = action.payload;
        }
      })
      .addCase(updateAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = state.assignments.filter(
          a => a._id !== action.payload && a.id !== action.payload
        );
      })
      .addCase(deleteAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Complete
      .addCase(completeAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(completeAssignment.fulfilled, (state, action) => {
        state.loading = false;
        const assignment = state.assignments.find(
          a =>
            a._id === action.payload.id ||
            a.id === action.payload.id ||
            a._id === action.payload._id
        );
        if (assignment) {
          assignment.status = 'completed';
        }
      })
      .addCase(completeAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setAssignments,
  addAssignment,
  updateAssignmentLocal,
  removeAssignment,
  setLoading,
  setError,
  clearError,
  setFilter,
  setSortBy,
  clearFilters,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;
