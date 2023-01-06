import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "services/firebase";

interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface SliceState {
  user: User | null;
}

const initialState: SliceState = { user: null };

export const login = createAsyncThunk("auth/login", async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  return {
    user: {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    },
  };
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  return {
    user: null,
  };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export const { updateAuth } = authSlice.actions;

export default authSlice.reducer;
