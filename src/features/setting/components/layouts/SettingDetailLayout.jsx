import BackButton from "../../../../components/common/BackButton";
import Container from "../../../../components/ui/Container";
import InfoTip from "../../../../components/ui/InfoTip";

const SettingDetailLayout = ({ 
  title, 
  icon: Icon, 
  iconColorClass, // Kita buat lebih fleksibel dengan passing class warna lengkap
  iconBgClass, 
  subtitle, 
  description, 
  children,
  showInfoTip = false, // Tidak semua setting butuh alert keamanan
  infoMessage = ""
}) => (
  <Container className="mx-auto max-w-4xl px-4">
    {/* Header Navigation */}
    <div className="space-y-6">
      <BackButton />
      <h2 className="flex items-center gap-2 border-b border-slate-300 pb-2 text-xl font-bold text-gray-800 dark:border-slate-800 dark:text-white">
        {title}
      </h2>
    </div>

    <div className="space-y-4">
      {/* Visual Header Section */}
      <div className="flex flex-col items-center py-6 text-center">
        <div className={`mb-4 flex h-20 w-20 items-center justify-center rounded-3xl shadow-inner ${iconBgClass} ${iconColorClass}`}>
          <Icon size={40} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">{subtitle}</h3>
        <p className="max-w-[250px] text-xs text-slate-500">{description}</p>
      </div>

      {/* InfoTip Opsional */}
      {showInfoTip && (
        <InfoTip type="alert" message={infoMessage} />
      )}

      {/* Konten Form / Input */}
      <div className="mt-2">
        {children}
      </div>
    </div>
  </Container>
);

export default SettingDetailLayout;