import { create } from "zustand";

interface Application {
  id: string;
  name: string;
  description: string;
}

interface ApplicationState {
  applications: Application[];
  addApplication: (application: Application) => void;
  updateApplication: (id: string, application: Application) => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  applications: [],
  addApplication: (application) => {
    set((state) => ({
      applications: [...state.applications, application],
    }));
  },
  updateApplication: (id, application) => {
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id ? { ...app, ...application } : app
      ),
    }));
  },
}));
