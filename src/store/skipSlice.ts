import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Skip, SkipState } from '../types/skip';

const initialState: SkipState = {
  skips: [],
  selectedSkip: null,
  loading: false,
  error: null,
};

export const fetchSkips = createAsyncThunk(
  'skip/fetchSkips',
  async () => {
    const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
    if (!response.ok) {
      throw new Error('Failed to fetch skips');
    }
    const data = await response.json();
    return data as Skip[];
  }
);

const skipSlice = createSlice({
  name: 'skip',
  initialState,
  reducers: {
    selectSkip: (state, action: PayloadAction<Skip>) => {
      state.selectedSkip = action.payload;
    },
    clearSelection: (state) => {
      state.selectedSkip = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkips.fulfilled, (state, action) => {
        state.loading = false;
        state.skips = action.payload;
      })
      .addCase(fetchSkips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch skips';
      });
  },
});

export const { selectSkip, clearSelection } = skipSlice.actions;
export default skipSlice.reducer;