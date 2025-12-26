import {
  User,
  KeyRound,
  Palette,
  LifeBuoy,
  Smartphone,
  MessageSquare,
  MessageSquareWarning,
} from "lucide-react";

import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router";

// UI Components
import Container from "../../../components/ui/Container";
import Wrapper from "../../../components/ui/Wrapper";
import Card from "../../../components/ui/Card";

export default function SettingMenu() {
  return (
    <Wrapper className="min-h-screen">
      <Container className="">
        {/* HEADER */}

        {/* --- 1. MENU UTAMA --- */}
        <div className="space-y-6">
          <SettingSection title="Akses Akun">
            <SettingMenuItem
              icon={<User size={18} className="text-blue-500" />}
              label="Username"
              desc="Identitas login unik"
              path="username"
            />
            <SettingMenuItem
              icon={<KeyRound size={18} className="text-orange-500" />}
              label="Password"
              desc="Kunci keamanan sistem"
              path="password"
            />
          </SettingSection>
          <SettingSection title="Preferences">
            <SettingMenuItem
              icon={<Palette size={18} className="text-pink-500" />}
              label="Tema Aplikasi"
              desc="Mode visual perangkat"
              path="theme"
            />
          </SettingSection>
          <SettingSection title="Bantuan">
            <SettingMenuItem
              icon={<MessageSquareWarning size={20} className="text-red-500" />}
              label="Buat Laporan"
              desc="Hubungi Pengembang & laporkan kendala"
            />
          </SettingSection>
          <SettingSection>
            <SettingMenuItem
              icon={<Smartphone size={20} className="text-emerald-500" />}
              label="Login Terakhir"
              desc="Android Chrome • Surabaya, ID • 10 menit yang lalu"
            />
          </SettingSection>
        </div>
      </Container>
    </Wrapper>
  );
}

function SettingSection({ title, children }) {
  return (
    <section className="space-y-2">
      <p className="px-4 text-[10px] font-black tracking-widest text-slate-400 uppercase">
        {title}
      </p>
      <Card className="overflow-hidden rounded-[2rem] border-none p-1 shadow-sm">
        {children}
      </Card>
    </section>
  );
}

function SettingMenuItem({ icon, label, desc, path }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={`${pathname}/${path}`}
      className="group flex w-full items-center justify-between rounded-2xl p-4 text-left transition-all active:bg-slate-50 dark:active:bg-slate-900"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-[1.2rem] bg-slate-50 p-3 shadow-sm transition-all group-hover:shadow-md group-active:bg-white dark:bg-slate-800 dark:group-active:bg-slate-700">
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800 dark:text-white">
            {label}
          </p>
          <p className="text-[10px] font-semibold text-slate-400">{desc}</p>
        </div>
      </div>
      <ChevronRight
        size={18}
        className="text-slate-200 transition-all group-hover:translate-x-1 group-hover:text-purple-500"
      />
    </Link>
  );
}
