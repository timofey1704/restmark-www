import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

interface Lead {
  name: string
  number: string
  message: string
}

// состояние для хранения массива лидов
interface LeadState {
  leads: Lead[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: LeadState = {
  leads: [],
  status: 'idle',
  error: null,
}

export const sendLead = createAsyncThunk(
  'leads/sendLead',
  async (lead: Lead) => {
    const response = await fetch('http://localhost:4000/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    })

    if (!response.ok) {
      throw new Error('Failed to send lead')
    }

    return lead
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
