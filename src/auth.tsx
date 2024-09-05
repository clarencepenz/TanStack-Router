import React from "react";

// Define the shape of the authentication context
export interface AuthContext {
  isAuthenticated: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

// Key for storing user information in local storage
const STORAGE_KEY = "tanstack.auth.user";

// Function to retrieve the stored user from local storage
function getStoredUser() {
  return localStorage.getItem(STORAGE_KEY);
}

// Function to set the stored user in local storage
function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEY, user);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(getStoredUser());
  
  // Check if a user is authenticated based on whether 'user' is truthy
  const isAuthenticated = !!user;

  // Function to introduce a delay (simulating network latency)
  const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Function to log out the user
  const logout = React.useCallback(async () => {
    await sleep(250);
    setStoredUser(null); 
    setUser(null);
  }, []);

  // Function to log in the user
  const login = React.useCallback(async (username: string) => {
    await sleep(500);
    setStoredUser(username);
    setUser(username);
  }, []);

  // Effect hook to synchronize 'user' state with local storage on mount
  React.useEffect(() => {
    setUser(getStoredUser());  // Set the 'user' state to the stored user on component mount
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children} 
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");  // Throw an error if context is null
  }
  return context;
}