"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { Profile, ProfileInsert } from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string, fullName: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<string | null>;
  resetPassword: (email: string) => Promise<string | null>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getProfileDefaults(user: User): ProfileInsert {
  return {
    id: user.id,
    full_name: typeof user.user_metadata.full_name === "string" ? user.user_metadata.full_name : user.email ?? null,
    email: user.email ?? null,
    plan: "free",
    monthly_trip_limit: 3,
    monthly_trip_count: 0,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    const currentUser = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null;
    if (!currentUser) {
      setProfile(null);
      return;
    }

    const { data } = await supabase.from("profiles").select("*").eq("id", currentUser.id).maybeSingle();
    if (data) {
      setProfile(data as Profile);
      return;
    }

    const { data: createdProfile } = await supabase
      .from("profiles")
      .insert([getProfileDefaults(currentUser)])
      .select("*")
      .single();

    setProfile((createdProfile as Profile | null) ?? null);
  };

  useEffect(() => {
    let active = true;

    const boot = async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", data.session.user.id).maybeSingle();
        if (profileData) {
          if (active) setProfile(profileData as Profile);
        } else {
          const { data: createdProfile } = await supabase
            .from("profiles")
            .insert([getProfileDefaults(data.session.user)])
            .select("*")
            .single();
          if (active) setProfile((createdProfile as Profile | null) ?? null);
        }
      }
      if (active) {
        setMounted(true);
        setLoading(false);
      }
    };

    void boot();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      if (nextSession?.user) void refreshProfile();
      else setProfile(null);
      setLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("Login error:", error);
    }
    return error?.message ?? null;
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) {
      console.error("Registration error:", error);
    }
    return error?.message ?? null;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    return error?.message ?? null;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    return error?.message ?? null;
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ user, session, profile, loading, signIn, signUp, signOut, signInWithGoogle, resetPassword, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
