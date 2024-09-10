import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Lead, LeadRequest, LeadState } from '@/app/types'

const initialState: LeadState = {
  leads: [],
  status: 'idle',
  error: null,
}

export const sendLead = createAsyncThunk(
  'leads/sendLead',
  async (leadRequest: LeadRequest) => {
    const { url, data } = leadRequest

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to send lead')
    }

    return data
  }
)

const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    addLead(state, action: PayloadAction<Lead>) {
      state.leads.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLead.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(sendLead.fulfilled, (state, action: PayloadAction<Lead>) => {
        state.status = 'succeeded'
        state.leads.push(action.payload)
      })
      .addCase(sendLead.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong'
      })
  },
})

export const { addLead } = leadSlice.actions
export default leadSlice.reducer
