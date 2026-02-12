import { useState, useMemo, useEffect, useCallback } from "react";
import { ArrowRightLeft, Info } from "lucide-react";
import CustomFormComponent from "../../../components/forms/CustomFormComponent";
import { createSubmissionService } from "../../../services/submissionService";
import { searchEmployeesService } from "../../../services/employeeService";
import { useCurrentEmployee } from "../contexts/CurrentEmployeeProvider";
import { useNavigate } from "react-router";
import { useToast } from "../../../contexts/ToastProvider";
import BackButton from "../../../components/common/BackButton";
import Container from "../../../components/ui/Container";
import { format } from "date-fns";

const CreateSubmissionPage = () => {
  const currentEmployee = useCurrentEmployee();
  const [staffOptions, setStaffOptions] = useState([]);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [createSubmissionForm, setCreateSubmissionForm] = useState({
    type: "",
    receiverId: "",
    date: "",
    sederDate: "",
    receiverDate: "",
    message: ""
  });

  useEffect(() => {
    searchEmployeesService({
      divisionId: currentEmployee.division?.id,
      positionId: currentEmployee.position?.id,
    }).then(({ data }) => {
      setStaffOptions(
        data
          .filter((staff) => staff.id !== currentEmployee.id)
          .map((staff) => ({
            label: staff.nickname,
            value: staff.id,
          })),
      );
    });
  }, [currentEmployee]);

  const formFields = useMemo(() => {
    const baseFields = [
      {
        name: "type",
        label: "Tipe Permintaan",
        type: "select",
        options: [
          { value: "SHIFT_SWAP", label: "Tukar Shift" },
          { value: "OFF_SWAP", label: "Tukar Hari Libur" },
          { value: "BACKUP", label: "Minta Fullin" },
        ],
        value: createSubmissionForm.type,
      },
      {
        name: "receiverId",
        label: `Rekan Kerja`,
        type: "select",
        options: staffOptions,
        placeholder: "Pilih rekan kerja (opsional)",
      },
    ];

    const scheduleFields = {
      SHIFT_SWAP: [
        {
          name: "date",
          label: "Tanggal",
          type: "date",
        },
      ],

      OFF_SWAP: [
        {
          name: "senderDate",
          label: "Tanggal Libur Anda",
          type: "date",
        },
        {
          name: "receiverDate",
          label: "Tanggal Libur Rekan",
          type: "date",
        },
      ],

      BACKUP: [
        {
          name: "date",
          label: "Tanggal",
          type: "date",
        },
      ],
    };

    return [
      ...baseFields,
      ...(scheduleFields[createSubmissionForm.type] || []),
      {
        name: "message",
        label: "Pesan Tambahan",
        type: "text",
        placeholder: "Tambahkan pesan (opsional)",
      },
    ];
  }, [createSubmissionForm, staffOptions]);

  const handleChange = useCallback(
    (e) => {
      setCreateSubmissionForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    [createSubmissionForm],
  );

  const handleFormSubmit = useCallback(
    async (payload) => {
      try {
        Object.keys(payload).forEach((key) => {
          const value = payload[key];

          if (value && (value instanceof Date || !isNaN(Date.parse(value)))) {
            const dateObject = new Date(value);

            payload[key] = format(dateObject, "yyyy-MMMM-dd");
          }
        });
        const { data } = await createSubmissionService(payload);
        showToast(
          `Permitaan berhasil di kirim ke ${data.receiver.nickname}`,
          "success",
        );
      } catch (err) {
        throw err;
      }
      navigate(-1);
    },
    [createSubmissionService, showToast],
  );

  return (
    <Container className="mx-auto max-w-2xl space-y-8">
      <BackButton />
      {/* Visual Indicator */}
      <div className="flex items-center gap-4 rounded-2xl bg-purple-50 p-6 dark:bg-purple-900/20">
        <div className="flex min-h-12 min-w-12 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg">
          <ArrowRightLeft size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">
            Buat Permintaan
          </h1>
          <p className="text-sm text-slate-500">
            Pastikan jadwal kamu maupun jadwal rekan sudah sesuai sebelum
            mengirim.
          </p>
        </div>
      </div>

      <CustomFormComponent
        fields={formFields}
        onChange={handleChange}
        formData={createSubmissionForm}
        onSubmit={handleFormSubmit}
        buttonName="Kirim Permintaan"
      />

      <div className="mt-6 flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
        <Info size={18} className="mt-0.5 shrink-0" />
        <p className="text-xs leading-relaxed">
          Permintaan akan diteruskan kepada Penerima terkait dan memerlukan
          persetujuan dari Penerima.
        </p>
      </div>
    </Container>
  );
};

export default CreateSubmissionPage;
