import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PomodoroSettings {
  timer: number;
  shortBreak: number;
  longBreak: number;
}

interface PomodoroState {
  settings: PomodoroSettings;
  activeTask: string | null;
  taskList: string[];
}

const initialState: PomodoroState = {
  settings: {
    timer: 25,
    shortBreak: 5,
    longBreak: 20,
  },
  activeTask: null,
  taskList: [],
};

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<PomodoroSettings>) => {
      state.settings = action.payload;
    },
    setTimer: (state, action: PayloadAction<number>) => {
      state.settings.timer = action.payload;
    },
    setShortBreak: (state, action: PayloadAction<number>) => {
      state.settings.shortBreak = action.payload;
    },
    setLongBreak: (state, action: PayloadAction<number>) => {
      state.settings.longBreak = action.payload;
    },
  },
});

export const { setSettings, setTimer, setShortBreak, setLongBreak } =
  pomodoroSlice.actions;

export default pomodoroSlice.reducer;
