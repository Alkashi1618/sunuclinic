// Mock Database - Simulates backend persistence with localStorage

export type UserRole = "patient" | "medecin" | "secretaire" | "admin";

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  role: UserRole;
  createdAt: string;
}

// Serializer: transforms raw data to/from storage format
const UserSerializer = {
  serialize(user: User): string {
    return JSON.stringify(user);
  },
  deserialize(data: string): User {
    return JSON.parse(data);
  },
  serializeList(users: User[]): string {
    return JSON.stringify(users);
  },
  deserializeList(data: string): User[] {
    return JSON.parse(data);
  },
};

const STORAGE_KEY = "medicare_users";
const SESSION_KEY = "medicare_session";

// Seed default users on first load
function seedDefaults(): User[] {
  const defaults: User[] = [
    {
      id: crypto.randomUUID(),
      email: "admin@medicare.fr",
      password: "Admin123!",
      firstName: "Sophie",
      lastName: "Martin",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      email: "medecin@medicare.fr",
      password: "Medecin123!",
      firstName: "Dr. Pierre",
      lastName: "Durand",
      role: "medecin",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      email: "secretaire@medicare.fr",
      password: "Secret123!",
      firstName: "Marie",
      lastName: "Leroy",
      role: "secretaire",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      email: "patient@medicare.fr",
      password: "Patient123!",
      firstName: "Jean",
      lastName: "Dupont",
      role: "patient",
      phone: "+33 6 12 34 56 78",
      dateOfBirth: "1990-05-15",
      createdAt: new Date().toISOString(),
    },
  ];
  localStorage.setItem(STORAGE_KEY, UserSerializer.serializeList(defaults));
  return defaults;
}

// ─── CRUD Operations ───

export function getAllUsers(): User[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return seedDefaults();
  return UserSerializer.deserializeList(raw);
}

export function getUserByEmail(email: string): User | undefined {
  return getAllUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(data: Omit<User, "id" | "createdAt">): { success: boolean; error?: string; user?: User } {
  const existing = getUserByEmail(data.email);
  if (existing) return { success: false, error: "Un compte avec cet email existe déjà." };

  const user: User = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const users = getAllUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEY, UserSerializer.serializeList(users));
  return { success: true, user };
}

export function authenticate(email: string, password: string, role: UserRole): { success: boolean; error?: string; user?: User } {
  const user = getUserByEmail(email);
  if (!user) return { success: false, error: "Aucun compte trouvé avec cet email." };
  if (user.password !== password) return { success: false, error: "Mot de passe incorrect." };
  if (user.role !== role) return { success: false, error: `Ce compte n'a pas le rôle "${role}".` };
  return { success: true, user };
}

// ─── Update User ───

export function updateUser(id: string, data: Partial<Pick<User, "firstName" | "lastName" | "phone" | "dateOfBirth">>): { success: boolean; error?: string } {
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return { success: false, error: "Utilisateur introuvable." };
  users[idx] = { ...users[idx], ...data };
  localStorage.setItem(STORAGE_KEY, UserSerializer.serializeList(users));
  // Refresh session with updated data
  saveSession(users[idx]);
  return { success: true };
}

export function changePassword(id: string, currentPassword: string, newPassword: string): { success: boolean; error?: string } {
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return { success: false, error: "Utilisateur introuvable." };
  if (users[idx].password !== currentPassword) return { success: false, error: "Mot de passe actuel incorrect." };
  users[idx].password = newPassword;
  localStorage.setItem(STORAGE_KEY, UserSerializer.serializeList(users));
  return { success: true };
}

// ─── Session ───

export function saveSession(user: User): void {
  const { password, ...safeUser } = user;
  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
}

export function getSession(): Omit<User, "password"> | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  return JSON.parse(raw);
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
