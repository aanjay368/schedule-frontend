import {
  User,
  KeyRound,
  Palette,
  Smartphone,
  MessageSquareWarning,
} from "lucide-react";

import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router";

// UI Components
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import {
  DetailGroup,
  DetailItem,
} from "../../../components/layouts/DataDetailLayout";

export default function SettingMenu() {
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
    <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {menuConfig.map((section, idx) => (
        <DetailGroup
          label={section.group}
          className={section.span ? "sm:col-span-2" : ""}
        >
          <div className="flex flex-col gap-4">
            {section.items.map((item) => (
              <MenuItem
                icon={item.icon}
                label={item.label}
                desc={item.desc}
                path={item.path}
              />
            ))}
          </div>
        </DetailGroup>
      ))}
    </Container>
  );
}

function MenuItem({ icon, label, desc, path }) {
  const { pathname } = useLocation();

  return (
    <Link to={`${pathname}${path}`}>
      <Card className="group flex w-full items-center justify-between p-4 text-left transition-all active:bg-slate-50 dark:active:bg-slate-900">
        <div className="group flex items-start gap-4">
          <div className="mt-1 text-slate-400 transition-colors group-hover:text-purple-500">
            {icon}
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{label}</p>
            <span  className="text-xs font-medium text-slate-400">
              {desc|| "-"}
            </span>
          </div>
        </div>        
        <ChevronRight
          size={18}
          className="text-slate-200 transition-all group-hover:translate-x-1 group-hover:text-purple-500"
        />
      </Card>
    </Link>
  );
}
