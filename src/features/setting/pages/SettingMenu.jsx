import { User, KeyRound, Palette, MessageSquareWarning } from "lucide-react";

// UI Components
import Container from "../../../components/ui/Container";
import { DetailGroup } from "../../../components/layouts/DataDetailLayout";

import SectionHeader from "../../../components/ui/SectionHeader";
import MenuItem from "../../../components/ui/MenuItem";
import {useLocation} from "react-router";

export default function SettingMenu() {
  const {pathname} =  useLocation()
  const menuConfig = [
    {
      group: "Akses Akun",
      items: [
        {
          label: "Username",
          desc: "Identitas login unik",
          path: "/username",
          icon: <User size={18} className="text-blue-500" />,
        },
        {
          label: "Password",
          desc: "Kunci keamanan sistem",
          path: "/password",
          icon: <KeyRound size={18} className="text-orange-500" />,
        },
      ],
    },
    {
      group: "Preferences",
      items: [
        {
          label: "Tema Aplikasi",
          desc: "Mode visual perangkat",
          path: "/theme",
          icon: <Palette size={18} className="text-pink-500" />,
        },
      ],
    },
    {
      group: "Bantuan",
      span: true, // Marker jika ingin span 2 kolom di desktop
      items: [
        {
          label: "Buat Laporan",
          desc: "Hubungi Pengembang",
          path: "/report",
          icon: <MessageSquareWarning size={18} className="text-red-500" />,
        },
      ],
    },
  ];

  return (
    <Container className="space-y-4">
      <SectionHeader>Menu Pengaturan</SectionHeader>
      {menuConfig.map((section) => (
        <DetailGroup key={section.group} label={section.group}>
          <div className="flex flex-col gap-4 sm:flex-row">
            {section.items.map((item) => (
              <MenuItem key={item.label} to={`${pathname}${item.path}`}>
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-slate-400 transition-colors group-hover:text-purple-500">
                    {item.icon}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {item.label}
                    </p>
                    <p className="text-xs font-medium text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </MenuItem>
            ))}
          </div>
        </DetailGroup>
      ))}
    </Container>
  );
}
