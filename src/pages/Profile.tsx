import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Settings, Lock, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { updateUser, changePassword } from "@/lib/mockDatabase";

const roleNavMap: Record<string, { items: { label: string; href: string; icon: React.ReactNode }[]; role: string }> = {
  patient: {
    role: "Patient",
    items: [
      { label: "Tableau de bord", href: "/patient", icon: <Settings className="h-4 w-4" /> },
      { label: "Mon profil", href: "/profil", icon: <User className="h-4 w-4" /> },
    ],
  },
  medecin: {
    role: "Médecin",
    items: [
      { label: "Tableau de bord", href: "/medecin", icon: <Settings className="h-4 w-4" /> },
      { label: "Mon profil", href: "/profil", icon: <User className="h-4 w-4" /> },
    ],
  },
  secretaire: {
    role: "Secrétaire",
    items: [
      { label: "Tableau de bord", href: "/secretaire", icon: <Settings className="h-4 w-4" /> },
      { label: "Mon profil", href: "/profil", icon: <User className="h-4 w-4" /> },
    ],
  },
  admin: {
    role: "Administrateur",
    items: [
      { label: "Tableau de bord", href: "/admin", icon: <Settings className="h-4 w-4" /> },
      { label: "Mon profil", href: "/profil", icon: <User className="h-4 w-4" /> },
    ],
  },
};

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth ?? "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  if (!user) return null;

  const nav = roleNavMap[user.role] ?? roleNavMap.patient;

  const handleProfileSave = () => {
    setSavingProfile(true);
    const result = updateUser(user.id, { firstName, lastName, phone, dateOfBirth });
    if (result.success) {
      refreshUser();
      toast({ title: "Profil mis à jour", description: "Vos informations ont été enregistrées." });
    } else {
      toast({ title: "Erreur", description: result.error, variant: "destructive" });
    }
    setSavingProfile(false);
  };

  const handlePasswordChange = () => {
    if (newPassword.length < 8) {
      toast({ title: "Erreur", description: "Le mot de passe doit contenir au moins 8 caractères.", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas.", variant: "destructive" });
      return;
    }
    setSavingPassword(true);
    const result = changePassword(user.id, currentPassword, newPassword);
    if (result.success) {
      toast({ title: "Mot de passe modifié", description: "Votre mot de passe a été mis à jour." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast({ title: "Erreur", description: result.error, variant: "destructive" });
    }
    setSavingPassword(false);
  };

  return (
    <DashboardLayout
      title="Mon profil"
      subtitle="Gérez vos informations personnelles"
      navItems={nav.items}
      userRole={nav.role}
      userName={`${user.firstName} ${user.lastName}`}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back button */}
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>

        {/* Profile info card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Informations personnelles</CardTitle>
                <CardDescription>Modifiez vos données de profil</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} disabled className="opacity-60" />
              <p className="text-xs text-muted-foreground">L'email ne peut pas être modifié.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+33 6 00 00 00 00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date de naissance</Label>
                <Input id="dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={handleProfileSave} disabled={savingProfile} className="gap-2">
                <Save className="h-4 w-4" /> Enregistrer
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Password change card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Lock className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-xl">Changer le mot de passe</CardTitle>
                <CardDescription>Mettez à jour votre mot de passe de connexion</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPwd">Mot de passe actuel</Label>
              <Input id="currentPwd" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPwd">Nouveau mot de passe</Label>
                <Input id="newPwd" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min. 8 caractères" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPwd">Confirmer</Label>
                <Input id="confirmPwd" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={handlePasswordChange} disabled={savingPassword || !currentPassword || !newPassword} className="gap-2">
                <Lock className="h-4 w-4" /> Modifier le mot de passe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
